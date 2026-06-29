import pytest
from app.workflow.services.engine import WorkflowEngine
from app.workflow.state.base import WorkflowState
from app.workflow.exceptions.base import WorkflowValidationError
from app.understanding.services.understanding_service import UnderstandingService
from app.understanding.providers.mock_provider import MockUnderstandingProvider
from app.domain.entities.case import Case
from app.domain.entities.incident import Incident
from app.domain.enums.base import ReporterType, InputType

@pytest.fixture
def workflow_engine():
    provider = MockUnderstandingProvider()
    understanding_service = UnderstandingService(provider=provider)
    return WorkflowEngine(understanding_service=understanding_service)

@pytest.fixture
def dummy_case():
    return Case(id="c1", title="Emergency", description="Testing")

def test_successful_workflow(workflow_engine, dummy_case):
    incident = Incident(
        id="i1",
        case_id="c1",
        reporter_type=ReporterType.NEIGHBOR,
        input_type=InputType.TEXT,
        content="Neighbor collapsed"
    )
    
    result = workflow_engine.run(incident=incident, case=dummy_case)
    
    assert result.success is True
    assert result.state == WorkflowState.UNDERSTANDING_COMPLETED
    assert result.context.understanding is not None
    assert result.context.understanding.successful is True
    assert "Possible medical emergency" in result.context.understanding.understanding.summary
    assert result.processing_time_ms >= 0

def test_failed_understanding(workflow_engine, dummy_case):
    incident = Incident(
        id="i1",
        case_id="c1",
        reporter_type=ReporterType.NEIGHBOR,
        input_type=InputType.TEXT,
        content="There is a fire."  # This triggers the simulated failure in MockUnderstandingProvider
    )
    
    result = workflow_engine.run(incident=incident, case=dummy_case)
    
    assert result.success is False
    assert result.state == WorkflowState.FAILED
    assert result.context.understanding is None
    assert len(result.errors) > 0
    assert "Simulated provider failure" in result.errors[0]

def test_invalid_input(workflow_engine, dummy_case):
    incident = Incident(
        id="i1",
        case_id="c1",
        reporter_type=ReporterType.NEIGHBOR,
        input_type=InputType.TEXT,
        content="a"
    )
    incident.content = ""  # Bypassing pydantic validation for the service validation test
    
    with pytest.raises(WorkflowValidationError):
        workflow_engine.run(incident=incident, case=dummy_case)

def test_health_check(workflow_engine):
    assert workflow_engine.health() is True
