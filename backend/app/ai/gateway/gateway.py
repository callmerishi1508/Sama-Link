from typing import Dict, Any, Union
from app.ai.parsers.response_parser import ResponseParser
from app.understanding.models.base import IncidentUnderstanding
from app.ai.exceptions.base import InvalidAIResponseError

class AIGateway:
    """
    The sole entry point for processing raw AI provider outputs.
    Ensures absolute strictness in adhering to the AIResponseContract.
    """
    def __init__(self, parser: ResponseParser):
        self.parser = parser
        
    def process_provider_response(self, raw_response: Union[str, Dict[str, Any]]) -> IncidentUnderstanding:
        """
        Accepts provider responses, invokes parser and validator,
        and returns canonical understanding.
        """
        if not raw_response:
            raise InvalidAIResponseError("Received empty response from AI provider.")
            
        return self.parser.parse(raw_response)
