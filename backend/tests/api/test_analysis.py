from fastapi.testclient import TestClient
from unittest.mock import patch
import pytest
from app.main import app
from app.core.config import settings

@pytest.fixture(autouse=True)
def mock_gemini_key():
    original_key = settings.GEMINI_API_KEY
    settings.GEMINI_API_KEY = "dummy-test-key"
    yield
    settings.GEMINI_API_KEY = original_key

client = TestClient(app)

def test_analyze_endpoint_success():
    # Mocking Gemini SDK to prevent actual API calls and force a valid response
    valid_json = '''
    {
      "summary": "Mocked successful gemini response",
      "facts": ["Test fact"],
      "entities": ["Test entity"],
      "concerns": ["Test concern", "collapse", "missing"],
      "ambiguities": [],
      "reasoning": ["It's a test."],
      "confidence": 0.99,
      "missing_information": []
    }
    '''
    with patch('app.understanding.providers.gemini_provider.GeminiUnderstandingProvider._call_gemini', return_value=valid_json):
        response = client.post(
            "/api/v1/analyze",
            json={"incident_text": "medical emergency, collapse, missing routine", "language": "en"}
        )
        
        print(response.json())
        assert response.status_code == 200
        data = response.json()
        assert data["summary"] == "Mocked successful gemini response"
        assert data["provider"] == "GeminiUnderstandingProvider"
        assert data["fallback_used"] is False
        assert "risk" in data
        assert "decision" in data
        assert data["decision"]["recommended_action"] == "RECOMMEND_EMERGENCY_SERVICES" # because of critical rules matched

def test_analyze_endpoint_validation_error():
    # Sending text that is too short (min 10)
    response = client.post(
        "/api/v1/analyze",
        json={"incident_text": "short", "language": "en"}
    )
    assert response.status_code == 422
    assert "String should have at least 10 characters" in response.text

def test_analyze_endpoint_provider_fallback():
    # Simulating a timeout / exception from Gemini
    with patch('app.understanding.providers.gemini_provider.GeminiUnderstandingProvider._call_gemini', side_effect=Exception("API Timeout")):
        response = client.post(
            "/api/v1/analyze",
            json={"incident_text": "medical emergency, collapse, missing routine", "language": "en"}
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Fallback should be triggered, and mock provider result returned
        assert data["fallback_used"] is True
        assert "Person missing" in data["summary"]
        assert "risk" in data
        assert "decision" in data
