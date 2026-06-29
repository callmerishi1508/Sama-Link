import pytest
from pydantic import ValidationError
from app.domain.value_objects.confidence import ConfidenceScore
from app.domain.exceptions.base import InvalidConfidenceScoreError

def test_valid_confidence_score():
    score = ConfidenceScore(value=0.5)
    assert score.value == 0.5
    
    score_low = ConfidenceScore(value=0.0)
    assert score_low.value == 0.0
    
    score_high = ConfidenceScore(value=1.0)
    assert score_high.value == 1.0

def test_invalid_confidence_score_too_low():
    with pytest.raises(InvalidConfidenceScoreError):
        ConfidenceScore(value=-0.1)

def test_invalid_confidence_score_too_high():
    with pytest.raises(InvalidConfidenceScoreError):
        ConfidenceScore(value=1.1)

def test_immutability():
    score = ConfidenceScore(value=0.5)
    with pytest.raises(ValidationError):
        score.value = 0.8
