import pytest
from app.domain.enums.base import RiskLevel
from app.risk.models.base import RiskAssessment
from app.decision.services.engine import DecisionEngine
from app.decision.policies.base import ActionType

@pytest.fixture
def decision_engine():
    return DecisionEngine()

def build_assessment(level: RiskLevel, rules: list = None) -> RiskAssessment:
    return RiskAssessment(
        risk_score=50,
        risk_level=level,
        confidence=0.9,
        triggered_rules=rules or [],
        supporting_evidence=[],
        explanation="Test explanation",
        requires_human_confirmation=False
    )

def test_low_risk_decision(decision_engine):
    assessment = build_assessment(RiskLevel.LOW, ["Routine Match"])
    plan = decision_engine.generate_plan(assessment)
    
    assert plan.recommended_action == ActionType.MONITOR.value
    assert plan.requires_human_confirmation is False
    assert "Routine Match" in plan.reason
    assert plan.estimated_response_time == "N/A"

def test_medium_risk_decision(decision_engine):
    assessment = build_assessment(RiskLevel.MEDIUM, ["Missing Routine"])
    plan = decision_engine.generate_plan(assessment)
    
    assert plan.recommended_action == ActionType.CONTACT_FAMILY.value
    assert plan.requires_human_confirmation is False
    assert "Missing Routine" in plan.reason
    assert plan.estimated_response_time == "2-4 hours"

def test_high_risk_decision(decision_engine):
    assessment = build_assessment(RiskLevel.HIGH, ["No Response", "Lives Alone"])
    plan = decision_engine.generate_plan(assessment)
    
    assert plan.recommended_action == ActionType.DISPATCH_VOLUNTEER.value
    assert plan.requires_human_confirmation is True
    assert "No Response, Lives Alone" in plan.reason
    assert ActionType.CONTACT_FAMILY.value in plan.alternative_actions

def test_critical_risk_decision(decision_engine):
    assessment = build_assessment(RiskLevel.CRITICAL, ["Collapse Detected", "Emergency Keywords"])
    plan = decision_engine.generate_plan(assessment)
    
    assert plan.recommended_action == ActionType.RECOMMEND_EMERGENCY_SERVICES.value
    assert plan.requires_human_confirmation is True
    assert "Collapse Detected" in plan.reason
    assert plan.estimated_response_time == "< 15 minutes"

def test_explanation_generation_no_rules(decision_engine):
    assessment = build_assessment(RiskLevel.LOW, [])
    plan = decision_engine.generate_plan(assessment)
    
    assert "no specific rules" in plan.reason
