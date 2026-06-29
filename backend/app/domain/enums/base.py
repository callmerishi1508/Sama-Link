from enum import Enum

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class CaseStatus(str, Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    ESCALATED = "escalated"
    RESOLVED = "resolved"
    CLOSED = "closed"

class EventType(str, Enum):
    REPORT_RECEIVED = "report_received"
    RISK_ASSESSED = "risk_assessed"
    ACTION_RECOMMENDED = "action_recommended"
    FEEDBACK_SUBMITTED = "feedback_submitted"
    RISK_ESCALATED = "risk_escalated"
    RISK_DEESCALATED = "risk_deescalated"
    HUMAN_CONFIRMATION = "human_confirmation"

class ReporterType(str, Enum):
    NEIGHBOR = "neighbor"
    FAMILY = "family"
    VOLUNTEER = "volunteer"
    PROFESSIONAL = "professional"
    AUTOMATED_SENSOR = "automated_sensor"

class InputType(str, Enum):
    TEXT = "text"
    VOICE = "voice"
    SENSOR_DATA = "sensor_data"
    SYSTEM_EVENT = "system_event"
