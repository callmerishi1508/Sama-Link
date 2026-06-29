from app.application.queries.models import GetCaseQuery, GetTimelineQuery, SearchCasesQuery
from app.domain.enums.base import CaseStatus

def test_get_case_query():
    query = GetCaseQuery(case_id="123")
    assert query.case_id == "123"

def test_get_timeline_query_defaults():
    query = GetTimelineQuery(case_id="123")
    assert query.case_id == "123"
    assert query.limit == 50
    assert query.offset == 0

def test_search_cases_query():
    query = SearchCasesQuery(status=CaseStatus.OPEN)
    assert query.status == CaseStatus.OPEN
    assert query.limit == 20
    assert query.offset == 0
