from app.understanding.interfaces.provider import UnderstandingProviderPort
from app.understanding.models.base import UnderstandingRequest, IncidentUnderstanding
from app.understanding.exceptions.base import ProviderError

class MockUnderstandingProvider(UnderstandingProviderPort):
    """
    A deterministic, rule-based provider for testing the architecture without real AI.
    """
    
    def understand(self, request: UnderstandingRequest) -> IncidentUnderstanding:
        text = request.incident_text.lower()
        
        # Rule-based logic
        summary = "Generic report received."
        concerns = []
        entities = ["neighbor"]
        facts = ["Incident reported"]
        
        if "collapse" in text or "fall" in text or "medical" in text:
            summary = "Possible medical emergency reported."
            concerns.append("Immediate physical danger")
            facts.append("Collapse or fall mentioned")
        
        if "missing" in text or "not seen" in text:
            summary = "Person missing from routine check-in."
            concerns.append("Deviation from routine")
            facts.append("Missed check-in")
            
        if "fire" in text:
            # Simulate a provider failure scenario based on content
            raise ProviderError("Simulated provider failure for testing")

        return IncidentUnderstanding(
            summary=summary,
            extracted_facts=facts,
            entities=entities,
            concerns=concerns,
            ambiguities=["Exact time of incident unknown"],
            confidence=0.85
        )

    def health(self) -> bool:
        return True
