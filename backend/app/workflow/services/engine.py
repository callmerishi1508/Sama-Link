import time
from app.workflow.interfaces.engine import WorkflowEnginePort
from app.workflow.models.base import WorkflowContext, WorkflowResult
from app.workflow.state.base import WorkflowState
from app.workflow.exceptions.base import WorkflowValidationError, WorkflowExecutionError
from app.understanding.services.understanding_service import UnderstandingService
from app.understanding.models.base import UnderstandingRequest
from app.domain.entities.incident import Incident
from app.domain.entities.case import Case

class WorkflowEngine(WorkflowEnginePort):
    """
    Orchestrates the execution of the product pipeline.
    Coordinates independent engines (e.g., Understanding).
    Does NOT make business or risk decisions.
    """
    
    def __init__(self, understanding_service: UnderstandingService):
        self.understanding_service = understanding_service
        
    def run(self, incident: Incident, case: Case) -> WorkflowResult:
        start_time = time.time()
        
        # 1. Validation
        if not incident or not incident.content:
            raise WorkflowValidationError("Incident content cannot be empty.")
            
        # 2. Create Workflow Context
        context = WorkflowContext(
            case=case,
            incident=incident
        )
        state = WorkflowState.CREATED
        errors = []
        
        try:
            # 3. Invoke Understanding Service
            state = WorkflowState.UNDERSTANDING_STARTED
            request = UnderstandingRequest(
                incident_text=incident.content,
                optional_context={"case_id": case.id}
            )
            
            understanding_result = self.understanding_service.process_incident(request)
            
            # 4. Receive Understanding Result and Update Context/State
            context.understanding = understanding_result
            state = WorkflowState.UNDERSTANDING_COMPLETED
            
        except Exception as e:
            state = WorkflowState.FAILED
            errors.append(f"Understanding phase failed: {str(e)}")
            
        # 5. Return Workflow Result
        success = (state == WorkflowState.UNDERSTANDING_COMPLETED)
        
        return WorkflowResult(
            success=success,
            state=state,
            context=context,
            errors=errors,
            processing_time_ms=int((time.time() - start_time) * 1000)
        )

    def health(self) -> bool:
        try:
            return self.understanding_service.provider.health()
        except Exception:
            return False
