from datetime import datetime
from app.domain.entities.case import Case
from app.domain.entities.incident import Incident
from app.domain.entities.event import Event
from app.domain.enums.base import CaseStatus, ReporterType, InputType, EventType

def test_valid_case_creation():
    case = Case(
        id="case_123",
        title="Missing Neighbor",
        description="Neighbor hasn't been seen today."
    )
    assert case.id == "case_123"
    assert case.status == CaseStatus.OPEN
    assert isinstance(case.created_at, datetime)
    
    # Check serialization
    case_dict = case.model_dump()
    assert case_dict["status"] == "open"

def test_valid_incident_creation():
    incident = Incident(
        id="inc_123",
        case_id="case_123",
        reporter_type=ReporterType.NEIGHBOR,
        input_type=InputType.TEXT,
        content="She didn't check in this morning."
    )
    assert incident.id == "inc_123"
    assert incident.reporter_type == ReporterType.NEIGHBOR
    assert isinstance(incident.timestamp, datetime)

def test_valid_event_creation():
    event = Event(
        id="evt_123",
        case_id="case_123",
        event_type=EventType.REPORT_RECEIVED,
        actor="system",
        metadata={"source": "sms"}
    )
    assert event.id == "evt_123"
    assert event.event_type == EventType.REPORT_RECEIVED
    assert event.metadata == {"source": "sms"}
    assert isinstance(event.timestamp, datetime)
