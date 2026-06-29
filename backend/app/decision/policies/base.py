from enum import Enum
from typing import List, Dict, Any
from app.domain.enums.base import RiskLevel

class ActionType(str, Enum):
    MONITOR = "MONITOR"
    CONTACT_FAMILY = "CONTACT_FAMILY"
    DISPATCH_VOLUNTEER = "DISPATCH_VOLUNTEER"
    CONTACT_LOCAL_HELP = "CONTACT_LOCAL_HELP"
    RECOMMEND_EMERGENCY_SERVICES = "RECOMMEND_EMERGENCY_SERVICES"

class Priority(str, Enum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    URGENT = "URGENT"
    IMMEDIATE = "IMMEDIATE"

class DecisionPolicy:
    def __init__(self, action: ActionType, priority: Priority, actor: str, requires_confirmation: bool,
                 reason_template: str, alternative_actions: List[ActionType], estimated_response: str):
        self.action = action
        self.priority = priority
        self.actor = actor
        self.requires_confirmation = requires_confirmation
        self.reason_template = reason_template
        self.alternative_actions = alternative_actions
        self.estimated_response = estimated_response

# Centralized Deterministic Policies based on RiskLevel
POLICIES: Dict[RiskLevel, DecisionPolicy] = {
    RiskLevel.LOW: DecisionPolicy(
        action=ActionType.MONITOR,
        priority=Priority.LOW,
        actor="System",
        requires_confirmation=False,
        reason_template="Low risk assessment with {rules}. Continuing passive monitoring.",
        alternative_actions=[ActionType.CONTACT_FAMILY],
        estimated_response="N/A"
    ),
    RiskLevel.MEDIUM: DecisionPolicy(
        action=ActionType.CONTACT_FAMILY,
        priority=Priority.NORMAL,
        actor="System / Family",
        requires_confirmation=False,
        reason_template="Medium risk concern due to {rules}. Recommending direct family check-in.",
        alternative_actions=[ActionType.DISPATCH_VOLUNTEER],
        estimated_response="2-4 hours"
    ),
    RiskLevel.HIGH: DecisionPolicy(
        action=ActionType.DISPATCH_VOLUNTEER,
        priority=Priority.URGENT,
        actor="Volunteer",
        requires_confirmation=True,
        reason_template="High-risk welfare concern with {rules} and multiple supporting indicators.",
        alternative_actions=[ActionType.CONTACT_FAMILY, ActionType.CONTACT_LOCAL_HELP],
        estimated_response="30-60 minutes"
    ),
    RiskLevel.CRITICAL: DecisionPolicy(
        action=ActionType.RECOMMEND_EMERGENCY_SERVICES,
        priority=Priority.IMMEDIATE,
        actor="Emergency Services / Dispatcher",
        requires_confirmation=True,
        reason_template="Critical risk detected ({rules}). Immediate professional intervention required.",
        alternative_actions=[ActionType.DISPATCH_VOLUNTEER],
        estimated_response="< 15 minutes"
    )
}
