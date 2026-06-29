import time
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

from app.workflow.services.engine import WorkflowEngine
from app.understanding.services.understanding_service import UnderstandingService
from app.understanding.providers.gemini_provider import GeminiUnderstandingProvider
from app.understanding.providers.mock_provider import MockUnderstandingProvider
from app.ai.gateway.gateway import AIGateway
from app.ai.parsers.response_parser import ResponseParser
from app.ai.validators.response_validator import ResponseValidator
from app.risk.services.engine import RiskEngine
from app.decision.services.engine import DecisionEngine
from app.domain.entities.incident import Incident
from app.understanding.exceptions.base import ProviderError

router = APIRouter()

class AnalysisRequest(BaseModel):
    incident_text: str = Field(..., min_length=10, max_length=5000, description="The raw incident report text.")
    language: str = Field(default="en", description="Language code of the input text.")

class AnalysisResponse(BaseModel):
    summary: str
    understanding: Dict[str, Any]
    risk: Dict[str, Any]
    decision: Dict[str, Any]
    processing_time_ms: int
    provider: str
    fallback_used: bool
    fallback_reason: Optional[str] = None

# Dependency Injection for Engines
def get_services():
    validator = ResponseValidator()
    parser = ResponseParser(validator=validator)
    gateway = AIGateway(parser=parser)
    mock_provider = MockUnderstandingProvider()
    gemini_provider = GeminiUnderstandingProvider(ai_gateway=gateway, mock_provider=mock_provider)
    understanding_service = UnderstandingService(provider=gemini_provider)
    workflow_engine = WorkflowEngine(understanding_service=understanding_service)
    risk_engine = RiskEngine()
    decision_engine = DecisionEngine()
    
    return {
        "workflow": workflow_engine,
        "risk": risk_engine,
        "decision": decision_engine,
        "provider": gemini_provider
    }

@router.get("/health/ai")
async def health_ai(services: dict = Depends(get_services)):
    provider = services["provider"]
    configured = provider.health()
    return {
        "provider": "Gemini",
        "configured": configured,
        "healthy": configured,
        "model": provider.model_name
    }

@router.post("/analyze", response_model=AnalysisResponse, summary="Execute Complete Analysis Pipeline")
async def analyze_incident(request: AnalysisRequest, services: dict = Depends(get_services)):
    start_time = time.time()
    
    try:
        # 1. Pipeline Start: Create Case and Incident
        import uuid
        from app.domain.entities.case import Case
        from app.domain.enums.base import ReporterType, InputType
        
        case_id = str(uuid.uuid4())
        case = Case(
            id=case_id,
            title="Analysis Request",
            description="Created via Public API"
        )
        
        incident = Incident(
            id=str(uuid.uuid4()),
            case_id=case_id,
            reporter_type=ReporterType.AUTOMATED_SENSOR,
            input_type=InputType.TEXT,
            content=request.incident_text
        )
        
        # 2. Workflow Orchestration (Handles Understanding internally)
        workflow_result = services["workflow"].run(incident=incident, case=case)
        
        if not workflow_result.success:
            print(f"WORKFLOW ERRORS: {workflow_result.errors}")
            raise HTTPException(status_code=500, detail="Workflow execution failed.")
            
        # The provider might have fallen back
        provider = services["provider"]
        provider_name = provider.__class__.__name__
        fallback_used = provider.fallback_occurred
        fallback_reason = provider.fallback_reason

        # 3. Explainable Risk Engine
        incident_understanding = workflow_result.context.understanding.understanding
        
        risk_assessment = services["risk"].assess_risk(incident_understanding)
        
        # 4. Explainable Decision Engine
        decision_plan = services["decision"].generate_plan(risk_assessment)
        
        processing_time_ms = int((time.time() - start_time) * 1000)
        
        return AnalysisResponse(
            summary=incident_understanding.summary,
            understanding=incident_understanding.model_dump(),
            risk=risk_assessment.model_dump(),
            decision=decision_plan.model_dump(),
            processing_time_ms=processing_time_ms,
            provider=provider_name,
            fallback_used=fallback_used,
            fallback_reason=fallback_reason
        )
        
    except ProviderError as e:
        import traceback
        traceback.print_exc()
        # If even the fallback fails (unlikely, but safe)
        raise HTTPException(status_code=502, detail="AI Provider Error. Unable to process the request.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        # Internal server error
        raise HTTPException(status_code=500, detail="Internal Server Error.")
