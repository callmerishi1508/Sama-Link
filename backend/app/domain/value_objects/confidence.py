from pydantic import BaseModel
from app.domain.exceptions.base import InvalidConfidenceScoreError

class ConfidenceScore(BaseModel):
    value: float
    
    model_config = {
        "frozen": True
    }
        
    def __init__(self, **data):
        super().__init__(**data)
        if not (0.0 <= self.value <= 1.0):
            raise InvalidConfidenceScoreError(f"Confidence score must be between 0.0 and 1.0, got {self.value}")
