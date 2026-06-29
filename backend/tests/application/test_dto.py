from datetime import datetime
from app.application.dto.models import CaseSummaryDTO, RecommendationDTO
from app.domain.enums.base import CaseStatus, RiskLevel

def test_case_summary_dto():
    now = datetime.utcnow()
    dto = CaseSummaryDTO(
        id="case_1",
        title="Test",
        status=CaseStatus.OPEN,
        created_at=now,
        updated_at=now
    )
    assert dto.id == "case_1"
    assert dto.status == CaseStatus.OPEN

def test_recommendation_dto():
    dto = RecommendationDTO(
        id="rec_1",
        case_id="case_1",
        risk_level=RiskLevel.HIGH,
        confidence=0.85,
        reasoning=["Reason 1"],
        evidence=["Evidence 1"],
        recommended_actions=["Action 1"],
        requires_human_confirmation=True
    )
    assert dto.risk_level == RiskLevel.HIGH
    assert dto.confidence == 0.85
    assert dto.requires_human_confirmation is True
