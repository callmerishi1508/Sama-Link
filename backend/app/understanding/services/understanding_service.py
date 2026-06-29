import time
from app.understanding.models.base import UnderstandingRequest, UnderstandingResult
from app.understanding.interfaces.provider import UnderstandingProviderPort
from app.understanding.exceptions.base import ValidationError, ProviderError

class UnderstandingService:
    """
    Coordinates the validation and execution of the understanding process.
    """
    def __init__(self, provider: UnderstandingProviderPort):
        self.provider = provider
        
    def process_incident(self, request: UnderstandingRequest) -> UnderstandingResult:
        if not request.incident_text or len(request.incident_text.strip()) == 0:
            raise ValidationError("Incident text cannot be empty.")
            
        # Health check removed so fallback logic within provider can handle it
            
        start_time = time.time()
        
        try:
            understanding = self.provider.understand(request)
            
            return UnderstandingResult(
                understanding=understanding,
                provider_name=self.provider.__class__.__name__,
                processing_time_ms=int((time.time() - start_time) * 1000),
                successful=True
            )
        except Exception as e:
            raise ProviderError(f"Provider failed to process request: {str(e)}") from e
