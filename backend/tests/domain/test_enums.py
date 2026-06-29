from app.domain.enums.base import RiskLevel, CaseStatus, EventType, ReporterType, InputType

def test_risk_level_enum():
    assert RiskLevel.LOW == "low"
    assert RiskLevel.CRITICAL == "critical"

def test_case_status_enum():
    assert CaseStatus.OPEN == "open"
    assert CaseStatus.ESCALATED == "escalated"

def test_event_type_enum():
    assert EventType.REPORT_RECEIVED == "report_received"
    assert EventType.HUMAN_CONFIRMATION == "human_confirmation"

def test_reporter_type_enum():
    assert ReporterType.NEIGHBOR == "neighbor"
    assert ReporterType.AUTOMATED_SENSOR == "automated_sensor"

def test_input_type_enum():
    assert InputType.TEXT == "text"
    assert InputType.VOICE == "voice"
