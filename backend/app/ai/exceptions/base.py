class AIContractError(Exception):
    """Base exception for AI Gateway errors."""
    pass

class InvalidAIResponseError(AIContractError):
    """Raised when an AI provider returns an invalid or malformed response."""
    pass

class UnsupportedProviderError(AIContractError):
    """Raised when an unsupported AI provider is invoked."""
    pass
