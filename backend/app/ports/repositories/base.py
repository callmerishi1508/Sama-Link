from typing import Protocol, List, Optional
from app.domain.entities.case import Case
from app.domain.entities.event import Event
from app.domain.enums.base import CaseStatus

class CaseRepositoryPort(Protocol):
    """
    Interface for Case persistence operations.
    """

    def get_by_id(self, case_id: str) -> Optional[Case]:
        """Retrieve a single case by its ID."""
        ...

    def save(self, case: Case) -> None:
        """Persist a case to the data store."""
        ...

    def search_by_status(self, status: CaseStatus, limit: int, offset: int) -> List[Case]:
        """Retrieve cases filtered by status with pagination."""
        ...


class EventRepositoryPort(Protocol):
    """
    Interface for Event sourcing and persistence.
    """

    def append(self, event: Event) -> None:
        """Append a new event to the event store."""
        ...

    def get_events_for_case(self, case_id: str) -> List[Event]:
        """Retrieve the chronological sequence of events for a specific case."""
        ...


class SnapshotRepositoryPort(Protocol):
    """
    Interface for saving and retrieving aggregate snapshots to optimize event replay.
    """

    def get_latest_snapshot(self, case_id: str) -> Optional[Case]:
        """Retrieve the most recent state snapshot for a case."""
        ...

    def save_snapshot(self, case: Case) -> None:
        """Persist a current state snapshot."""
        ...
