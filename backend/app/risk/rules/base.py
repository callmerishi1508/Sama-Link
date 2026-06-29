from typing import Callable, List, Optional
from pydantic import BaseModel, ConfigDict
from app.understanding.models.base import IncidentUnderstanding
import re

class RiskRule(BaseModel):
    name: str
    description: str
    score_delta: int
    condition_callable: Callable[[IncidentUnderstanding], bool]
    
    model_config = ConfigDict(arbitrary_types_allowed=True)

def _contains_keyword(text_list: List[str], keywords: List[str]) -> bool:
    combined_text = " ".join(text_list).lower()
    for kw in keywords:
        if kw in combined_text:
            return True
    return False

def _get_all_fields(u: IncidentUnderstanding) -> List[str]:
    return [u.summary] + u.extracted_facts + u.concerns + u.ambiguities + u.people + u.locations + u.hazards + u.vulnerable_people + u.timeline + u.emergency_indicators + u.follow_up_questions

def _detect_multi_victim(u: IncidentUnderstanding) -> int:
    text = " ".join(_get_all_fields(u)).lower()
    # Looking for explicit multi-victim keywords
    if _contains_keyword([text], ["5+ victims", "mass casualty", "dozens injured", "multiple fatalities"]):
        return 5
    if _contains_keyword([text], ["2 victims", "3 victims", "4 victims", "two victims", "three victims", "four victims", "multiple victims", "two people", "three people", "four people", "several people"]):
        return 2
    # Check lengths of arrays
    if len(u.people) + len(u.vulnerable_people) >= 5:
        return 5
    if len(u.people) + len(u.vulnerable_people) >= 2:
        return 2
    return 0

RULES = [
    # MEDICAL
    RiskRule(name="Collapse", description="Collapse detected", score_delta=70, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["collapse", "collapsed", "fainted"])),
    RiskRule(name="Unconscious", description="Unconscious person", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["unconscious", "unresponsive", "passed out"])),
    RiskRule(name="Not breathing", description="Not breathing", score_delta=100, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["not breathing", "cpr", "stopped breathing"])),
    RiskRule(name="Heart attack", description="Heart attack", score_delta=90, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["heart attack", "cardiac arrest", "chest pain", "arm numb"])),
    RiskRule(name="Bleeding", description="Severe bleeding", score_delta=60, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["bleeding", "blood", "hemorrhage"])),
    RiskRule(name="Stroke", description="Stroke symptoms", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["stroke", "face drooping", "slurred speech"])),
    RiskRule(name="Seizure", description="Seizure activity", score_delta=60, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["seizure", "convulsions", "epilepsy"])),
    RiskRule(name="Burn", description="Burn injuries", score_delta=50, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["burn", "burned", "scalded"])),
    
    # FIRE
    RiskRule(name="Fire detected", description="Fire detected", score_delta=60, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["fire", "blaze", "inferno"])),
    RiskRule(name="Flames", description="Flames visible", score_delta=60, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["flames", "flame"])),
    RiskRule(name="Explosion risk", description="Explosion hazard", score_delta=95, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["explosion", "exploded", "bomb"])),
    RiskRule(name="Gas leak", description="Gas leak", score_delta=90, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["gas leak", "smell gas", "natural gas"])),
    RiskRule(name="Smoke", description="Smoke detected", score_delta=30, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["smoke"])),
    RiskRule(name="Burning smell", description="Burning smell", score_delta=20, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["burning smell", "smells like burning"])),
    
    # MISSING PERSON
    RiskRule(name="Missing child", description="Child missing", score_delta=95, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["missing child", "child wandering", "lost child", "kidnapped child"])),
    RiskRule(name="Elderly missing", description="Elderly missing", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["elderly missing", "grandpa missing", "grandma missing"])),
    RiskRule(name="Wandered away", description="Wandered away", score_delta=60, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["wandered away", "wandered off", "walked away"])),
    RiskRule(name="Not seen", description="Person not seen", score_delta=30, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["not seen", "haven't seen", "missing"])),
    RiskRule(name="Lost", description="Person is lost", score_delta=40, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["lost", "can't find"])),
    
    # VIOLENCE
    RiskRule(name="Weapon", description="Weapon involved", score_delta=85, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["weapon", "armed", "shooter"])),
    RiskRule(name="Gun", description="Gun involved", score_delta=90, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["gun", "pistol", "rifle", "shot"])),
    RiskRule(name="Knife", description="Knife involved", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["knife", "stab", "stabbed"])),
    RiskRule(name="Domestic violence", description="Domestic violence", score_delta=70, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["domestic violence", "hitting her", "hitting him", "domestic abuse"])),
    RiskRule(name="Assault", description="Assault", score_delta=65, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["assault", "attacked", "beaten", "fighting"])),
    RiskRule(name="Screaming", description="Screaming heard", score_delta=40, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["screaming", "screams"])),
    RiskRule(name="Help", description="Cries for help", score_delta=40, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["help", "help me"])),
    
    # NATURAL DISASTER
    RiskRule(name="Flood", description="Flood hazard", score_delta=70, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["flood", "water rising", "water entering"])),
    RiskRule(name="Earthquake", description="Earthquake", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["earthquake", "shaking", "tremor"])),
    RiskRule(name="Cyclone", description="Cyclone/Hurricane", score_delta=75, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["cyclone", "hurricane", "tornado"])),
    RiskRule(name="Landslide", description="Landslide", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["landslide", "mudslide"])),
    RiskRule(name="Building collapse", description="Building collapse", score_delta=95, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["building collapse", "roof collapsed"])),
    
    # CHEMICAL
    RiskRule(name="Chemical spill", description="Chemical spill", score_delta=85, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["chemical spill", "acid spill"])),
    RiskRule(name="Gas station nearby", description="Gas station nearby", score_delta=30, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["gas station", "petrol station"])),
    RiskRule(name="Fuel leak", description="Fuel leak", score_delta=70, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["fuel leak", "oil spill", "gasoline"])),
    RiskRule(name="Toxic", description="Toxic hazard", score_delta=80, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["toxic", "poisonous", "fumes"])),
    RiskRule(name="Radiation", description="Radiation", score_delta=100, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["radiation", "radioactive"])),
    
    # MULTI-VICTIM & OTHER MODIFIERS
    RiskRule(name="Trapped victims", description="Trapped victims", score_delta=40, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["trapped", "stuck inside"])),
    RiskRule(name="Night time", description="Night time", score_delta=10, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["night", "dark", "evening"])),
    RiskRule(name="Forest", description="Forest area", score_delta=15, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["forest", "woods"])),
    RiskRule(name="Lives alone", description="Lives alone", score_delta=15, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["alone", "solo", "lives alone"])),

    # VULNERABILITY & MULTI-VICTIM DYNAMICS
    RiskRule(name="Child involved", description="Child involved", score_delta=30, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["child", "baby", "toddler", "boy", "girl", "son", "daughter", "kid"])),
    RiskRule(name="Elderly", description="Elderly involved", score_delta=20, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["elderly", "senior", "grandpa", "grandma", "old man", "old woman"])),
    RiskRule(name="Disabled", description="Disabled person", score_delta=25, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["disabled", "wheelchair", "blind", "deaf"])),
    RiskRule(name="Pregnant", description="Pregnant woman", score_delta=25, condition_callable=lambda u: _contains_keyword(_get_all_fields(u), ["pregnant"])),
    
    RiskRule(name="Multiple victims (2-5)", description="Multiple victims", score_delta=20, condition_callable=lambda u: _detect_multi_victim(u) == 2),
    RiskRule(name="Mass casualty (5+)", description="Mass casualty (5+)", score_delta=40, condition_callable=lambda u: _detect_multi_victim(u) == 5),
]

def determine_risk_level(score: int) -> 'app.domain.enums.base.RiskLevel':
    from app.domain.enums.base import RiskLevel
    if score < 30:
        return RiskLevel.LOW
    elif score < 60:
        return RiskLevel.MEDIUM
    elif score < 85:
        return RiskLevel.HIGH
    else:
        return RiskLevel.CRITICAL
