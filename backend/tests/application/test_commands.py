import pytest
from pydantic import ValidationError
from app.application.commands.models import CreateCaseCommand, ReportIncidentCommand
from app.domain.enums.base import ReporterType, InputType

def test_create_case_command_valid():
    cmd = CreateCaseCommand(title="Emergency", description="Details")
    assert cmd.title == "Emergency"
    assert cmd.description == "Details"

def test_create_case_command_invalid_title():
    with pytest.raises(ValidationError):
        CreateCaseCommand(title="", description="Details")

def test_report_incident_command_valid():
    cmd = ReportIncidentCommand(
        reporter_type=ReporterType.NEIGHBOR,
        input_type=InputType.TEXT,
        content="Suspicious activity"
    )
    assert cmd.reporter_type == ReporterType.NEIGHBOR
    assert cmd.content == "Suspicious activity"
    assert cmd.case_id is None

def test_report_incident_command_invalid_content():
    with pytest.raises(ValidationError):
        ReportIncidentCommand(
            reporter_type=ReporterType.NEIGHBOR,
            input_type=InputType.TEXT,
            content=""
        )
