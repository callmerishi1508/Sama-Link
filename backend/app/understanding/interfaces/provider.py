from typing import Protocol
from app.understanding.models.base import UnderstandingRequest, IncidentUnderstanding

class UnderstandingProviderPort(Protocol):
    """
    Interface for NLP/AI providers that perform text understanding.
    """
    
    def understand(self, request: UnderstandingRequest) -> IncidentUnderstanding:
        """
        Process the raw incident text and extract structured understanding.
        """
        ...
        
    def health(self) -> bool:
        """
        Check if the provider is available and healthy.
        """
        ...
