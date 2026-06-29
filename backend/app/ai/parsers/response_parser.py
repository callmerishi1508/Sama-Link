import json
from typing import Dict, Any, Union
from pydantic import ValidationError
from app.ai.contracts.base import AIResponseContract
from app.ai.validators.response_validator import ResponseValidator
from app.understanding.models.base import IncidentUnderstanding
from app.ai.exceptions.base import InvalidAIResponseError

class ResponseParser:
    """
    Parses raw provider data (JSON string or Dict) into an AIResponseContract, 
    then uses the ResponseValidator to produce an IncidentUnderstanding.
    """
    def __init__(self, validator: ResponseValidator):
        self.validator = validator

    def parse(self, raw_response: Union[str, Dict[str, Any]]) -> IncidentUnderstanding:
        try:
            if isinstance(raw_response, str):
                data = json.loads(raw_response)
            else:
                data = raw_response
                
            contract = AIResponseContract(**data)
            return self.validator.validate_and_convert(contract)
            
        except json.JSONDecodeError as e:
            raise InvalidAIResponseError(f"Malformed JSON response: {str(e)}") from e
        except ValidationError as e:
            raise InvalidAIResponseError(f"Response failed contract validation: {str(e)}") from e
        except Exception as e:
            raise InvalidAIResponseError(f"Unexpected parsing error: {str(e)}") from e
