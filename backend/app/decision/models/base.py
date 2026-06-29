from pydantic import BaseModel
from typing import List

class DecisionPlan(BaseModel):
    recommended_action: str
    priority: str
    recommended_actor: str
    requires_human_confirmation: bool
    reason: str
    alternative_actions: List[str]
    estimated_response_time: str
