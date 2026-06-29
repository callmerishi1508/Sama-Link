from typing import Protocol
from app.workflow.models.base import WorkflowResult
from app.domain.entities.incident import Incident
from app.domain.entities.case import Case

class WorkflowEnginePort(Protocol):
    """
    Interface for the Workflow Engine orchestration.
    """
    def run(self, incident: Incident, case: Case) -> WorkflowResult:
        """
        Execute the orchestration pipeline for a given incident.
        """
        ...
        
    def health(self) -> bool:
        """
        Check if the workflow engine and its dependencies are healthy.
        """
        ...
