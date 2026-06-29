from typing import Protocol, Dict, Any, List
from app.application.dto.models import RecommendationDTO

class AIProviderPort(Protocol):
    """
    Interface for AI Intelligence providers (e.g., Gemini, OpenAI).
    Responsible for generating explainable recommendations and assessing context.
    """

    def generate_recommendation(self, context: Dict[str, Any]) -> RecommendationDTO:
        """
        Generate a structured recommendation based on the provided context.
        """
        ...

    def summarize_incident(self, events: List[Dict[str, Any]]) -> str:
        """
        Produce a concise summary of a series of events.
        """
        ...

    def assess_urgency(self, context: Dict[str, Any]) -> str:
        """
        Evaluate the urgency of an incident based on the context.
        """
        ...

    def extract_structured_information(self, raw_input: str) -> Dict[str, Any]:
        """
        Extract meaningful structured data (e.g., location, entities) from raw text.
        """
        ...
