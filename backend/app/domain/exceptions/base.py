class DomainValidationError(ValueError):
    """Base exception for all domain validation errors."""
    pass

class InvalidConfidenceScoreError(DomainValidationError):
    """Raised when a confidence score is not within the valid range (0.0 to 1.0)."""
    pass
