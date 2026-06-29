from typing import Protocol, List
from app.application.commands.models import CreateCaseCommand, ReportIncidentCommand, UpdateCaseStatusCommand
from app.application.queries.models import GetCaseQuery, GetTimelineQuery
from app.application.dto.models import CaseSummaryDTO, IncidentReportDTO, TimelineItemDTO, RecommendationDTO

class CaseApplicationService(Protocol):
    def create_case(self, command: CreateCaseCommand) -> CaseSummaryDTO:
        ...

    def get_case(self, query: GetCaseQuery) -> CaseSummaryDTO:
        ...

    def update_case_status(self, command: UpdateCaseStatusCommand) -> CaseSummaryDTO:
        ...

class IncidentApplicationService(Protocol):
    def report_incident(self, command: ReportIncidentCommand) -> IncidentReportDTO:
        ...

class TimelineApplicationService(Protocol):
    def get_timeline(self, query: GetTimelineQuery) -> List[TimelineItemDTO]:
        ...

class RecommendationApplicationService(Protocol):
    def recommend_action(self, case_id: str) -> RecommendationDTO:
        ...
