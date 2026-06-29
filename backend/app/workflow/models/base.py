from datetime import datetime
import uuid
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field
from app.workflow.state.base import WorkflowState
from app.domain.entities.case import Case
from app.domain.entities.incident import Incident
from app.understanding.models.base import UnderstandingResult

class WorkflowContext(BaseModel):
    execution_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    case: Optional[Case] = None
    incident: Optional[Incident] = None
    understanding: Optional[UnderstandingResult] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    started_at: datetime = Field(default_factory=datetime.utcnow)

class WorkflowResult(BaseModel):
    success: bool
    state: WorkflowState
    context: WorkflowContext
    errors: List[str] = Field(default_factory=list)
    processing_time_ms: int
