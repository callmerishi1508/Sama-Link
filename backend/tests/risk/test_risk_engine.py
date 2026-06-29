import pytest
from app.understanding.models.base import IncidentUnderstanding
from app.risk.services.engine import RiskEngine
from app.domain.enums.base import RiskLevel

@pytest.fixture
def risk_engine():
    return RiskEngine()

def build_understanding(summary="", facts=None, entities=None, concerns=None, people=None, locations=None, hazards=None, vuln=None, emergency=None, confidence=0.8):
    return IncidentUnderstanding(
        summary=summary,
        extracted_facts=facts or [],
        entities=entities or [],
        concerns=concerns or [],
        ambiguities=[],
        confidence=confidence,
        missing_information=[],
        people=people or [],
        locations=locations or [],
        hazards=hazards or [],
        vulnerable_people=vuln or [],
        timeline=[],
        emergency_indicators=emergency or [],
        follow_up_questions=[],
        language_detected="en",
        sentiment="neutral"
    )

def test_medical_collapse(risk_engine):
    u = build_understanding(summary="A man collapsed on the street.")
    assessment = risk_engine.assess_risk(u)
    assert "Collapse" in assessment.triggered_rules
    assert assessment.risk_level in [RiskLevel.HIGH, RiskLevel.CRITICAL]

def test_medical_not_breathing(risk_engine):
    u = build_understanding(summary="Person is not breathing.")
    assessment = risk_engine.assess_risk(u)
    assert "Not breathing" in assessment.triggered_rules
    assert assessment.risk_score >= 100
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_medical_heart_attack(risk_engine):
    u = build_understanding(summary="He is having a heart attack.")
    assessment = risk_engine.assess_risk(u)
    assert "Heart attack" in assessment.triggered_rules

def test_medical_stroke_and_seizure(risk_engine):
    u = build_understanding(summary="Having a stroke and seizure.")
    assessment = risk_engine.assess_risk(u)
    assert "Stroke" in assessment.triggered_rules
    assert "Seizure" in assessment.triggered_rules
    assert assessment.risk_score >= 100

def test_fire_flames(risk_engine):
    u = build_understanding(summary="I see flames coming from the window.")
    assessment = risk_engine.assess_risk(u)
    assert "Flames" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.HIGH

def test_fire_explosion_gas_station(risk_engine):
    u = build_understanding(summary="explosion at the gas station")
    assessment = risk_engine.assess_risk(u)
    assert "Explosion risk" in assessment.triggered_rules
    assert "Gas station nearby" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_fire_burning_smell(risk_engine):
    u = build_understanding(summary="There is a burning smell in the hallway.")
    assessment = risk_engine.assess_risk(u)
    assert "Burning smell" in assessment.triggered_rules

def test_missing_child(risk_engine):
    u = build_understanding(summary="missing child in the forest at night.")
    assessment = risk_engine.assess_risk(u)
    assert "Missing child" in assessment.triggered_rules
    assert "Forest" in assessment.triggered_rules
    assert "Night time" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_elderly_missing(risk_engine):
    u = build_understanding(summary="grandpa missing")
    assessment = risk_engine.assess_risk(u)
    assert "Elderly missing" in assessment.triggered_rules
    assert assessment.risk_level in [RiskLevel.HIGH, RiskLevel.CRITICAL]

def test_lost_wandered(risk_engine):
    u = build_understanding(summary="wandered off and is lost")
    assessment = risk_engine.assess_risk(u)
    assert "Wandered away" in assessment.triggered_rules
    assert "Lost" in assessment.triggered_rules
    assert assessment.risk_score >= 100

def test_violence_weapon_gun(risk_engine):
    u = build_understanding(summary="He has a weapon, a gun and a knife.")
    assessment = risk_engine.assess_risk(u)
    assert "Weapon" in assessment.triggered_rules
    assert "Gun" in assessment.triggered_rules
    assert "Knife" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_violence_domestic_assault(risk_engine):
    u = build_understanding(summary="He is hitting her, it's domestic violence and an assault.")
    assessment = risk_engine.assess_risk(u)
    assert "Domestic violence" in assessment.triggered_rules
    assert "Assault" in assessment.triggered_rules

def test_violence_screaming_help(risk_engine):
    u = build_understanding(summary="Screaming for help me.")
    assessment = risk_engine.assess_risk(u)
    assert "Screaming" in assessment.triggered_rules
    assert "Help" in assessment.triggered_rules

def test_natural_disaster_flood(risk_engine):
    u = build_understanding(summary="water entering the house quickly")
    assessment = risk_engine.assess_risk(u)
    assert "Flood" in assessment.triggered_rules

def test_natural_disaster_earthquake(risk_engine):
    u = build_understanding(summary="Earthquake shaking the ground.")
    assessment = risk_engine.assess_risk(u)
    assert "Earthquake" in assessment.triggered_rules

def test_natural_disaster_building_collapse(risk_engine):
    u = build_understanding(summary="building collapse")
    assessment = risk_engine.assess_risk(u)
    assert "Building collapse" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_chemical_spill(risk_engine):
    u = build_understanding(summary="acid spill")
    assessment = risk_engine.assess_risk(u)
    assert "Chemical spill" in assessment.triggered_rules

def test_chemical_toxic_radiation(risk_engine):
    u = build_understanding(summary="toxic radioactive material")
    assessment = risk_engine.assess_risk(u)
    assert "Toxic" in assessment.triggered_rules
    assert "Radiation" in assessment.triggered_rules
    assert assessment.risk_level == RiskLevel.CRITICAL

def test_modifiers_trapped_alone(risk_engine):
    u = build_understanding(summary="trapped in a room, lives alone")
    assessment = risk_engine.assess_risk(u)
    assert "Trapped victims" in assessment.triggered_rules
    assert "Lives alone" in assessment.triggered_rules

def test_vulnerability_boosts(risk_engine):
    u = build_understanding(summary="pregnant disabled woman")
    assessment = risk_engine.assess_risk(u)
    assert "Disabled" in assessment.triggered_rules
    assert "Pregnant" in assessment.triggered_rules

def test_multi_victim_two(risk_engine):
    u = build_understanding(summary="two people injured")
    assessment = risk_engine.assess_risk(u)
    assert "Multiple victims (2-5)" in assessment.triggered_rules

def test_multi_victim_mass(risk_engine):
    u = build_understanding(summary="mass casualty incident")
    assessment = risk_engine.assess_risk(u)
    assert "Mass casualty (5+)" in assessment.triggered_rules

def test_false_alarm(risk_engine):
    u = build_understanding(summary="Everything is fine, it was a false alarm.")
    assessment = risk_engine.assess_risk(u)
    # Should trigger nothing or very low
    assert assessment.risk_level == RiskLevel.LOW
    assert assessment.risk_score == 0
    assert assessment.requires_human_confirmation is False

def test_explanation_format(risk_engine):
    u = build_understanding(summary="Fire detected.")
    assessment = risk_engine.assess_risk(u)
    assert "✔ Fire detected (+60)" in assessment.explanation
    assert "Total = 60" in assessment.explanation

def test_multi_victim_array_logic(risk_engine):
    u = build_understanding(people=["P1", "P2", "P3"])
    assessment = risk_engine.assess_risk(u)
    assert "Multiple victims (2-5)" in assessment.triggered_rules
