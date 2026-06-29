from app.risk.models.base import RiskAssessment
from app.decision.models.base import DecisionPlan
from app.decision.policies.base import POLICIES

class DecisionEngine:
    """
    Evaluates a RiskAssessment to deterministically recommend the safest next action.
    Never executes actions. Fully explainable.
    """
    
    def generate_plan(self, risk_assessment: RiskAssessment) -> DecisionPlan:
        policy = POLICIES.get(risk_assessment.risk_level)
        
        # Format the reason deterministically using the triggered rules from the risk assessment
        if risk_assessment.triggered_rules:
            rules_str = ", ".join(risk_assessment.triggered_rules)
        else:
            rules_str = "no specific rules"
            
        reason = policy.reason_template.format(rules=rules_str)
        
        return DecisionPlan(
            recommended_action=policy.action.value,
            priority=policy.priority.value,
            recommended_actor=policy.actor,
            requires_human_confirmation=policy.requires_confirmation,
            reason=reason,
            alternative_actions=[a.value for a in policy.alternative_actions],
            estimated_response_time=policy.estimated_response
        )
