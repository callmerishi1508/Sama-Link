class WorkflowError(Exception):
    """Base exception for all workflow errors."""
    pass

class WorkflowValidationError(WorkflowError):
    """Raised when the workflow input is invalid."""
    pass

class WorkflowExecutionError(WorkflowError):
    """Raised when a step in the workflow fails."""
    pass
