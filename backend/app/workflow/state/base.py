from enum import Enum

class WorkflowState(str, Enum):
    CREATED = "created"
    UNDERSTANDING_STARTED = "understanding_started"
    UNDERSTANDING_COMPLETED = "understanding_completed"
    FAILED = "failed"
