import pytest
from pydantic import ValidationError as PydanticValidationError
from app.understanding.models.base import UnderstandingRequest
from app.understanding.providers.mock_provider import MockUnderstandingProvider
from app.understanding.services.understanding_service import UnderstandingService
from app.understanding.exceptions.base import ValidationError, ProviderError

def test_mock_provider_medical():
    provider = MockUnderstandingProvider()
    req = UnderstandingRequest(incident_text="My neighbor has collapsed!")
    res = provider.understand(req)
    
    assert res.confidence == 0.85
    assert "Possible medical emergency" in res.summary
    assert "Immediate physical danger" in res.concerns

def test_mock_provider_missing():
    provider = MockUnderstandingProvider()
    req = UnderstandingRequest(incident_text="Elderly neighbor not seen today.")
    res = provider.understand(req)
    
    assert res.confidence == 0.85
    assert "Person missing" in res.summary

def test_service_successful_execution():
    provider = MockUnderstandingProvider()
    service = UnderstandingService(provider=provider)
    req = UnderstandingRequest(incident_text="Neighbor not seen.")
    
    result = service.process_incident(req)
    
    assert result.successful is True
    assert result.provider_name == "MockUnderstandingProvider"
    assert result.understanding.summary is not None
    assert isinstance(result.processing_time_ms, int)

def test_service_validation_error_empty_text():
    provider = MockUnderstandingProvider()
    service = UnderstandingService(provider=provider)
    
    with pytest.raises(PydanticValidationError):
        # Pydantic validation catches it before the service logic if instantiated improperly
        UnderstandingRequest(incident_text="")

    # Bypassing pydantic for service logic test
    req = UnderstandingRequest(incident_text="a")
    req.incident_text = "   "
    
    with pytest.raises(ValidationError):
        service.process_incident(req)

def test_service_provider_failure():
    provider = MockUnderstandingProvider()
    service = UnderstandingService(provider=provider)
    req = UnderstandingRequest(incident_text="There is a fire.")
    
    with pytest.raises(ProviderError) as exc:
        service.process_incident(req)
        
    assert "Provider failed" in str(exc.value)

def test_provider_health():
    provider = MockUnderstandingProvider()
    assert provider.health() is True
