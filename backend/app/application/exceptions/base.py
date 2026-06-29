class ApplicationError(Exception):
    """Base exception for all application layer errors."""
    pass

class UseCaseValidationError(ApplicationError):
    """Raised when application use case inputs are invalid."""
    pass

class CaseNotFoundError(ApplicationError):
    """Raised when a requested case cannot be found by the application layer."""
    pass
