# System Architecture

## High-Level Architecture
SAMA LINK follows **Clean Architecture** principles. The core domain logic is entirely isolated from external frameworks, UI, and specific AI providers. The system is composed of the following layers:
- **Domain Layer:** Event definitions, aggregates, and core interfaces.
- **Application Layer:** Use cases (commands/queries) orchestrating the domain and external services.
- **Infrastructure Layer:** Concrete implementations of Intelligence Engine providers, the Event Store, and external simulated integrations.
- **Presentation/API Layer:** HTTP/REST or GraphQL endpoints acting as the entry point.

## Event-Driven Architecture
The system relies on an **Event Store** approach rather than CRUD. 
- State is derived from a sequence of immutable events (e.g., `ReportReceived`, `RiskAssessed`, `ActionRecommended`, `FeedbackSubmitted`).
- This ensures a perfect audit trail and allows the Intelligence Engine to replay context to understand how a situation evolved.

## Intelligence Engine
- **Abstraction:** The engine communicates with AI capabilities through an abstract `IntelligenceProvider` interface.
- **Stages:** 
  1. **Ingestion & Context Gathering:** Collect recent events and entity history.
  2. **Analysis:** Evaluate the payload.
  3. **Action Recommendation:** Recommend the next best action.
  4. **Explanation generation:** Formalize the rationale.

### AI Response Contract
Every Intelligence Engine provider must adhere to and return this standard response schema to guarantee transparency and interoperability:
```json
{
    "summary": "",
    "risk_level": "",
    "confidence": 0.95,
    "reasoning": [],
    "evidence": [],
    "recommended_actions": [],
    "requires_human_confirmation": true
}
```

## Human Oversight
- **Human-in-the-Loop (HITL):** High-consequence decisions (e.g., escalating to emergency services) are modeled as Action Recommendations that remain pending until a `HumanConfirmation` event is recorded.
- The Intelligence Engine never triggers irreversible external actions autonomously. Humans approve high-consequence actions.

## Explainability
- Every Intelligence Engine output must include the standardized AI Response Contract.
- Explanations must trace back to the specific events or data points that influenced the risk assessment.
- This data is stored alongside the generated Action Recommendation in the Event Store.

## Risk Evolution
- Risk is not a static field; it is continuously recalculated based on incoming events.
- As new events (like Responder feedback) enter the system, a `RiskReassessment` use case is triggered.
- The system diffs the previous risk state with the newly calculated risk state and emits a `RiskEscalated` or `RiskDeescalated` event.

## Future Extensibility
- **Plugin Architecture:** New AI providers (OpenAI, Anthropic, local models) can be added by implementing the `IntelligenceProvider` interface.
- **Event Handlers:** New downstream consumers (notifications, analytics) can subscribe to the event bus without modifying core logic.
- **Simulated Integrations:** The MVP uses mock adapters for external systems (e.g., SMS, Emergency Dispatch), designed to be seamlessly swapped with real API clients later.
