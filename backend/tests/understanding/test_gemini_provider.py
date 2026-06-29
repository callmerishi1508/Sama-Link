import pytest
from unittest.mock import patch, MagicMock
from google.api_core.exceptions import ServiceUnavailable

from app.understanding.providers.gemini_provider import GeminiUnderstandingProvider
from app.understanding.providers.mock_provider import MockUnderstandingProvider
from app.ai.gateway.gateway import AIGateway
from app.ai.parsers.response_parser import ResponseParser
from app.ai.validators.response_validator import ResponseValidator
from app.understanding.models.base import UnderstandingRequest
from app.core.config import settings

@pytest.fixture
def configured_settings():
    original_key = settings.GEMINI_API_KEY
    settings.GEMINI_API_KEY = "dummy-test-key"
    yield
    settings.GEMINI_API_KEY = original_key

@pytest.fixture
def gemini_provider(configured_settings):
    validator = ResponseValidator()
    parser = ResponseParser(validator=validator)
    gateway = AIGateway(parser=parser)
    mock_provider = MockUnderstandingProvider()
    return GeminiUnderstandingProvider(ai_gateway=gateway, mock_provider=mock_provider)

def test_successful_provider_call(gemini_provider):
    valid_json = '''
    {
      "summary": "Successful Gemini test.",
      "facts": ["Test fact"],
      "entities": ["Test entity"],
      "concerns": ["Test concern"],
      "ambiguities": [],
      "reasoning": ["It's a test."],
      "confidence": 0.99,
      "missing_information": []
    }
    '''
    request = UnderstandingRequest(incident_text="Test incident")
    
    with patch.object(gemini_provider, '_call_gemini', return_value=valid_json):
        result = gemini_provider.understand(request)
        
        assert gemini_provider.fallback_occurred is False
        assert result.summary == "Successful Gemini test."
        assert result.confidence == 0.99
        assert "Test fact" in result.extracted_facts

def test_fallback_activation_network_failure(gemini_provider):
    request = UnderstandingRequest(incident_text="Test incident")
    
    with patch.object(gemini_provider, '_call_gemini', side_effect=ServiceUnavailable("Timeout")):
        result = gemini_provider.understand(request)
        
        assert gemini_provider.fallback_occurred is True
        assert "Gemini API or Network Failure" in gemini_provider.last_error
        # Mock provider returns generic report for this text
        assert "Generic report received." in result.summary

def test_fallback_activation_invalid_json(gemini_provider):
    request = UnderstandingRequest(incident_text="Test incident")
    
    with patch.object(gemini_provider, '_call_gemini', return_value="Not valid JSON"):
        result = gemini_provider.understand(request)
        
        assert gemini_provider.fallback_occurred is True
        assert "Gateway rejected response" in gemini_provider.last_error
        assert "Generic report received." in result.summary

def test_fallback_activation_empty_response(gemini_provider):
    request = UnderstandingRequest(incident_text="Test incident")
    
    with patch.object(gemini_provider, '_call_gemini', return_value="   "):
        result = gemini_provider.understand(request)
        
        assert gemini_provider.fallback_occurred is True
        assert "empty response" in gemini_provider.last_error

def test_unconfigured_api_key():
    original_key = settings.GEMINI_API_KEY
    settings.GEMINI_API_KEY = None
    
    try:
        validator = ResponseValidator()
        parser = ResponseParser(validator=validator)
        gateway = AIGateway(parser=parser)
        mock_provider = MockUnderstandingProvider()
        
        provider = GeminiUnderstandingProvider(ai_gateway=gateway, mock_provider=mock_provider)
        
        request = UnderstandingRequest(incident_text="Test incident")
        result = provider.understand(request)
        
        # It should trigger fallback because _call_gemini raises an error
        assert provider.fallback_occurred is True
        assert "missing_api_key" in provider.last_error
        
        # Health should be false
        assert provider.health() is False
    finally:
        settings.GEMINI_API_KEY = original_key
