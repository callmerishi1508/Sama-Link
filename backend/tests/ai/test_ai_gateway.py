import pytest
from app.ai.exceptions.base import InvalidAIResponseError
from app.ai.validators.response_validator import ResponseValidator
from app.ai.parsers.response_parser import ResponseParser
from app.ai.gateway.gateway import AIGateway

@pytest.fixture
def ai_gateway():
    validator = ResponseValidator()
    parser = ResponseParser(validator=validator)
    return AIGateway(parser=parser)

def test_valid_response(ai_gateway):
    valid_data = {
        "summary": "Everything is fine.",
        "facts": ["Fact 1", "Fact 2"],
        "entities": ["Person A"],
        "concerns": ["None"],
        "ambiguities": [],
        "reasoning": ["It's clearly stated."],
        "confidence": 0.95,
        "missing_information": [],
        "people": ["Person A"],
        "locations": ["Location A"],
        "hazards": ["Hazard A"],
        "vulnerable_people": [],
        "timeline": ["10 mins ago"],
        "emergency_indicators": ["Help"],
        "follow_up_questions": ["Are you safe?"],
        "language_detected": "English",
        "sentiment": "calm"
    }
    understanding = ai_gateway.process_provider_response(valid_data)
    assert understanding.summary == "Everything is fine."
    assert understanding.confidence == 0.95
    assert len(understanding.extracted_facts) == 2
    assert understanding.people == ["Person A"]
    assert understanding.locations == ["Location A"]
    assert understanding.hazards == ["Hazard A"]
    assert understanding.language_detected == "English"
    assert understanding.sentiment == "calm"

def test_missing_fields(ai_gateway):
    invalid_data = {
        "summary": "Missing fields here",
        "confidence": 0.9
        # Missing facts, entities, etc.
    }
    with pytest.raises(InvalidAIResponseError) as exc:
        ai_gateway.process_provider_response(invalid_data)
    assert "Response failed contract validation" in str(exc.value)

def test_invalid_confidence(ai_gateway):
    invalid_data = {
        "summary": "Invalid confidence.",
        "facts": [],
        "entities": [],
        "concerns": [],
        "ambiguities": [],
        "reasoning": ["Because I said so"],
        "confidence": 1.5,  # Invalid
        "missing_information": []
    }
    with pytest.raises(InvalidAIResponseError) as exc:
        ai_gateway.process_provider_response(invalid_data)
    assert "Confidence score must be between 0.0 and 1.0" in str(exc.value)

def test_empty_reasoning(ai_gateway):
    invalid_data = {
        "summary": "Empty reasoning.",
        "facts": [],
        "entities": [],
        "concerns": [],
        "ambiguities": [],
        "reasoning": [],  # Invalid: requires min 1 item
        "confidence": 0.5,
        "missing_information": []
    }
    with pytest.raises(InvalidAIResponseError):
        ai_gateway.process_provider_response(invalid_data)

def test_malformed_json(ai_gateway):
    malformed_json = "{ invalid_json: true,"
    with pytest.raises(InvalidAIResponseError) as exc:
        ai_gateway.process_provider_response(malformed_json)
    assert "Malformed JSON" in str(exc.value)

def test_gateway_failure_empty_response(ai_gateway):
    with pytest.raises(InvalidAIResponseError):
        ai_gateway.process_provider_response("")

def test_parser_normalization(ai_gateway):
    valid_data_with_whitespace = {
        "summary": "  Spaced summary.  ",
        "facts": ["  Fact 1  ", "", "Fact 2", "Fact 1", "fact 1"],
        "entities": ["   "],
        "concerns": ["  Concern 1 "],
        "ambiguities": [],
        "reasoning": ["Logical reasoning."],
        "confidence": 0.9,
        "missing_information": [],
        "people": ["Alice", "alice", "ALICE", "Bob"],
        "locations": ["Park", " park "],
        "hazards": [],
        "vulnerable_people": [],
        "timeline": [],
        "emergency_indicators": [],
        "follow_up_questions": [],
        "language_detected": "  Hindi  ",
        "sentiment": "  panicked  "
    }
    understanding = ai_gateway.process_provider_response(valid_data_with_whitespace)
    
    assert understanding.summary == "Spaced summary."
    # Deduplication and whitespace trimming check
    assert understanding.extracted_facts == ["Fact 1", "Fact 2"] 
    assert len(understanding.entities) == 0  # Should be stripped and filtered out if empty
    assert understanding.concerns == ["Concern 1"]
    
    # Case-insensitive deduplication check
    assert understanding.people == ["Alice", "Bob"]
    assert understanding.locations == ["Park"]
    
    assert understanding.language_detected == "Hindi"
    assert understanding.sentiment == "panicked"
