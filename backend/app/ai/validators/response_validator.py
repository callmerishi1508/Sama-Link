from typing import List

from app.ai.contracts.base import AIResponseContract
from app.understanding.models.base import IncidentUnderstanding
from app.ai.exceptions.base import InvalidAIResponseError

class ResponseValidator:
    """
    Validates and normalizes AIResponseContract.
    """
    
    def _normalize_list(self, lst: List[str]) -> List[str]:
        seen = set()
        result = []
        for item in lst:
            if not item:
                continue
            item = item.strip()
            if not item:
                continue
            # Deduplicate case-insensitively, preserve original casing
            item_lower = item.lower()
            if item_lower not in seen:
                seen.add(item_lower)
                result.append(item)
        return result

    def validate_and_convert(self, contract: AIResponseContract) -> IncidentUnderstanding:
        try:
            # Here we map the validated AIResponseContract to the domain's IncidentUnderstanding
            # The AIResponseContract already handles internal validation via Pydantic.
            return IncidentUnderstanding(
                summary=contract.summary.strip(),
                extracted_facts=self._normalize_list(contract.facts),
                entities=self._normalize_list(contract.entities),
                concerns=self._normalize_list(contract.concerns),
                ambiguities=self._normalize_list(contract.ambiguities),
                confidence=contract.confidence,
                missing_information=self._normalize_list(contract.missing_information),
                people=self._normalize_list(contract.people),
                locations=self._normalize_list(contract.locations),
                hazards=self._normalize_list(contract.hazards),
                vulnerable_people=self._normalize_list(contract.vulnerable_people),
                timeline=self._normalize_list(contract.timeline),
                emergency_indicators=self._normalize_list(contract.emergency_indicators),
                follow_up_questions=self._normalize_list(contract.follow_up_questions),
                language_detected=contract.language_detected.strip(),
                sentiment=contract.sentiment.strip()
            )
        except Exception as e:
            raise InvalidAIResponseError(f"Failed to validate and normalize response: {str(e)}") from e
