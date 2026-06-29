class UnderstandingError(Exception):
    """Base exception for all Understanding Layer errors."""
    pass

class ProviderError(UnderstandingError):
    """Raised when an understanding provider fails."""
    pass

class ValidationError(UnderstandingError):
    """Raised when inputs to the understanding service are invalid."""
    pass
