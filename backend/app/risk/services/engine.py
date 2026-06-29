from app.understanding.models.base import IncidentUnderstanding
from app.risk.models.base import RiskAssessment
from app.risk.rules.base import RULES, determine_risk_level
from app.domain.enums.base import RiskLevel

class RiskEngine:
    """
    Evaluates incident understanding using deterministic rules to calculate risk.
    Does NOT use AI. Fully explainable.
    """
    
    def assess_risk(self, understanding: IncidentUnderstanding) -> RiskAssessment:
        score = 0
        triggered_rules = []
        evidence = []
        
        # 1. Evaluate all deterministic rules
        for rule in RULES:
            match = rule.condition_callable(understanding)
            if match:
                score += rule.score_delta
                triggered_rules.append(rule.name)
                evidence.append(f"✔ {rule.name} (+{rule.score_delta})")

        original_score = score
        # Cap score at 100
        score = min(max(score, 0), 100)
        
        # 2. Determine Risk Level
        risk_level = determine_risk_level(score)
        
        # 3. Calculate Confidence
        # Baseline confidence comes from the Understanding phase
        confidence = understanding.confidence
        # Boost confidence if we have multiple supporting facts/rules triggered
        if len(triggered_rules) >= 2:
            confidence = min(confidence + 0.1, 1.0)
            
        # 4. Generate deterministic explanation
        explanation_lines = [f"Risk: {risk_level.name}", "Reason:"]
        if evidence:
            for ev in evidence:
                explanation_lines.append(ev)
            explanation_lines.append(f"Total = {original_score}")
        else:
            explanation_lines.append("No specific risk factors detected.")
            
        explanation = "\\n".join(explanation_lines)
        
        # 5. Determine if human confirmation is required
        # Always require confirmation for HIGH or CRITICAL risk
        requires_human_confirmation = risk_level in [RiskLevel.HIGH, RiskLevel.CRITICAL]

        return RiskAssessment(
            risk_score=score,
            risk_level=risk_level,
            confidence=confidence,
            triggered_rules=triggered_rules,
            supporting_evidence=evidence,
            explanation=explanation,
            requires_human_confirmation=requires_human_confirmation
        )
