# SAMA LINK Backend

This is the standalone FastAPI backend for the SAMA LINK Action Intelligence Engine.

## Setup & Installation

Ensure you have Python 3.12+ installed.

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `.\venv\Scripts\activate`
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in the required keys in the `.env` file.

## Running the Application

To start the development server with live reload:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
You can check the health endpoint at `http://127.0.0.1:8000/health`.
Swagger documentation is available at `http://127.0.0.1:8000/docs`.

## Running Tests

To execute tests and ensure the environment is correctly configured:

```bash
pytest
```

## Domain Layer

SAMA LINK uses a **DDD Lite** approach for its domain layer.
- **Why DDD Lite:** It helps us model the core business logic (Entities, Value Objects, Enums) cleanly without the boilerplate of full Domain-Driven Design (e.g., complex aggregates, CQRS).
- **Zero Infrastructure Dependencies:** The domain is completely pure. It never imports from FastAPI, databases, or third-party AI SDKs. This ensures business logic can be tested in isolation and won't break if infrastructure changes.
- **Why No Persistence Yet:** Persistence is intentionally deferred to subsequent phases. This forces us to define what the system *is* before deciding how it *saves data*.

## Application Layer

The Application Layer is responsible for coordinating the system's business use cases.
- **Responsibilities:** Validating inputs (Commands/Queries), coordinating repositories and services, and returning Data Transfer Objects (DTOs).
- **Use-Case Driven Architecture:** By defining clear `Commands` (e.g., `ReportIncidentCommand`) and `Queries` (e.g., `GetCaseQuery`), the intent of every action is explicit and decoupled from HTTP routing.
- **Why No Implementation Exists Yet:** We define the interfaces (Contracts) first to establish the boundaries. Concrete implementations (which involve real database interactions or AI calls) are built only once the contracts are rock-solid, following Dependency Inversion principles.

## Ports & Adapters (Hexagonal Architecture)

The Ports Layer defines every external capability the Application Layer depends on.
- **Why Ports Exist:** Ports abstract away the infrastructure (e.g., Supabase, Gemini, external APIs) behind pure Python Interfaces (Protocols). The core Application and Domain layers only communicate with these interfaces.
- **Adapters:** In later phases, Adapters (concrete implementations) will be built in the Infrastructure layer to satisfy these Ports and injected into the Application.
- **Maintainability:** By strictly adhering to Dependency Inversion, we ensure that if we need to swap OpenAI for Gemini or PostgreSQL for MongoDB, the business logic remains untouched.

## Understanding Layer (Vertical Slice)

The Understanding Layer acts as the first executable vertical slice of the SAMA LINK system.
- **Mock Provider First:** To prove the architecture works before committing to an AI API, we implemented a `MockUnderstandingProvider`. It returns a deterministic structured understanding of an incident using rule-based logic.
- **Future Integration:** Because the `UnderstandingService` relies solely on the abstract `UnderstandingProviderPort`, we can later build a `GeminiUnderstandingProvider` and inject it without changing a single line of the Application Layer or Domain logic.

## Workflow Engine (Application Orchestrator)

The Workflow Engine acts as the central conductor for the SAMA LINK product pipeline.
- **Why Separate Orchestration from AI:** AI providers (like Gemini) only understand text and return structure. They should not know *what* to do next. The Workflow Engine owns the execution pipeline and state transitions (e.g., `UNDERSTANDING_STARTED`, `UNDERSTANDING_COMPLETED`), ensuring a robust, trackable, and deterministic flow.
- **Pipeline Execution:** In this milestone, the engine takes an `Incident`, routes it to the `UnderstandingService`, and returns a `WorkflowResult`. As the system grows, subsequent engines (Risk, Recommendations) will simply plug into this same orchestration pipeline.

## AI Gateway (Structured Intelligence)

The AI Gateway is the ONLY layer allowed to communicate with large language models (LLMs).
- **Absolute Boundary:** Providers (like Gemini) never interact directly with business logic, database queries, or routing. They are completely isolated behind this gateway.
- **Strict Response Contracts:** Every LLM response is forced through the `AIResponseContract` (using Pydantic v2). If the LLM hallucinates a malformed structure or provides a confidence score outside `0.0 - 1.0`, the `ResponseValidator` rejects it immediately, raising an `InvalidAIResponseError`. This ensures the core engine never receives bad data.

## Gemini Provider (AI Integration)

The system integrates real generative AI via the `GeminiUnderstandingProvider`.
- **AI Gateway Interaction:** The provider only fetches raw JSON strings from Gemini using a strict system prompt. It immediately delegates all parsing and validation to the `AIGateway`. It never interprets the data itself.
- **Resilient Fallback:** If the Gemini API times out, fails, returns malformed JSON, or hallucinates outside the bounds of the `AIResponseContract`, the `GeminiUnderstandingProvider` catches the error. It transparently falls back to the `MockUnderstandingProvider`, ensuring the Workflow Engine never crashes and always receives a valid structured response.

## Explainable Risk Engine (Phase 3A)

The Risk Engine consumes structured outputs (`IncidentUnderstanding`) from the AI Gateway and deterministically calculates a `RiskAssessment`.
- **Why AI Never Calculates Risk:** AI providers can hallucinate or weigh factors inconsistently. Risk determination requires absolute accountability.
- **Deterministic Rules Improve Trust:** By using a centralized, hard-coded rule engine (e.g., "Missing Routine = +20", "Collapse Detected = +70"), we guarantee that the same incident facts will *always* result in the exact same `RiskLevel` (LOW, MEDIUM, HIGH, CRITICAL).
- **Explainability:** The engine automatically generates a human-readable `explanation` listing the exact rules triggered, ensuring that human responders know exactly *why* a risk level was assigned.

## Explainable Decision Engine (Phase 3B)

The Decision Engine consumes a `RiskAssessment` and deterministically recommends the safest next action by generating a `DecisionPlan`.
- **Why Recommendations are Deterministic:** In an emergency-adjacent domain, we cannot rely on a black-box AI to "decide" what to do. The translation from "HIGH RISK" to "DISPATCH VOLUNTEER" must be hardcoded and 100% predictable.
- **Why Humans Remain in Control:** The engine *never* executes the action itself. It only generates a `DecisionPlan` containing a `recommended_action`, an `estimated_response_time`, and a flag indicating if it `requires_human_confirmation`. This ensures SAMA LINK remains an *Action Intelligence* platform that empowers humans, rather than an automated dispatcher that bypasses them.

## Public Analysis API (Phase 4A)

The complete SAMA LINK intelligence pipeline is exposed through a unified REST API endpoint (`POST /api/v1/analyze`).
- **Input:** Raw incident text and language.
- **Output:** A unified JSON response containing the extracted `understanding`, the calculated `risk` assessment, the recommended `decision` plan, and the execution `processing_time_ms`.
- **Swagger Documentation:** Available locally at `http://localhost:8000/docs`.

### API Usage

**Sample Request (cURL):**
```bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/analyze' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "incident_text": "My elderly neighbor has not been seen for 3 days and is not answering the door.",
  "language": "en"
}'
```

**Sample Response:**
```json
{
  "summary": "Elderly neighbor missing for 3 days and unresponsive.",
  "understanding": {
    "summary": "Elderly neighbor missing for 3 days and unresponsive.",
    "extracted_facts": ["Neighbor has not been seen for 3 days", "Neighbor is not answering the door"],
    "entities": ["Neighbor"],
    "concerns": ["Missing routine", "No response"],
    "ambiguities": [],
    "confidence": 0.95
  },
  "risk": {
    "risk_score": 40,
    "risk_level": "MEDIUM",
    "confidence": 0.95,
    "triggered_rules": ["Missing Routine", "No Response"],
    "supporting_evidence": ["[Missing Routine] Person missed a routine check-in.", "[No Response] The individual is unresponsive to contact."],
    "explanation": "Risk: MEDIUM\\nReason:\\n• [Missing Routine] Person missed a routine check-in.\\n• [No Response] The individual is unresponsive to contact.\\n• Confidence 0.95.",
    "requires_human_confirmation": false
  },
  "decision": {
    "recommended_action": "CONTACT_FAMILY",
    "priority": "NORMAL",
    "recommended_actor": "System / Family",
    "requires_human_confirmation": false,
    "reason": "Medium risk concern due to Missing Routine, No Response. Recommending direct family check-in.",
    "alternative_actions": ["DISPATCH_VOLUNTEER"],
    "estimated_response_time": "2-4 hours"
  },
  "processing_time_ms": 1250,
  "provider": "GeminiUnderstandingProvider",
  "fallback_used": false
}
```

## Folder Explanation (Clean Architecture)

- `app/api/`: API Routers and endpoints.
- `app/core/`: Core configurations (settings, logging, exception handling).
- `app/config/`: Application specific configurations.
- `app/database/`: Database connection and setup.
- `app/ai/`: Intelligence Engine specific logic.
- `app/risk/`: Risk evolution logic.
- `app/decision/`: Decision coordination logic.
- `app/orchestration/`: Workflow orchestration.
- `app/services/`: Application services / use cases.
- `app/repositories/`: Data access layer interfaces and implementations.
- `app/models/`: Database models.
- `app/schemas/`: Pydantic schemas (DTOs).
- `app/middleware/`: FastAPI middlewares.
- `app/utils/`: Shared utilities.
- `app/events/`: Event definitions for Event Store.
- `tests/`: Pytest suites.
