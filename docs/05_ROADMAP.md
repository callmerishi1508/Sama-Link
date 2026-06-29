# Implementation Roadmap

## Phase 0: Project Constitution & Documentation (Current)
- Define architecture, product scope, and developer rules.
- Create single source of truth documentation.
- *Status: Complete.*

## Phase 1: Core Infrastructure & Scaffold
- Initialize repository (Node.js/TypeScript).
- Setup linting, formatting, and testing frameworks.
- Define the folder structure adhering to Clean Architecture.

## Phase 2: Event Store & Domain Modeling
- Define Domain Events (`ReportReceived`, `FeedbackSubmitted`, `RiskAssessed`).
- Implement the baseline Event Bus and In-Memory Event Store.
- Create the Incident Aggregate Root.
- Implement state derivation (replaying events to get current state).
- Write unit tests for the domain state transitions.

## Phase 3: Intelligence Engine & Abstraction
- Define the `IntelligenceProvider` interface and AI Response Contract.
- Implement the Intelligence Engine Use Cases (Risk Assessment, Action Recommendation).
- Create a mock AI provider for predictable testing.
- Implement the real AI provider adapter (e.g., OpenAI/Anthropic wrapper).
- Ensure the Explanation generation is explicitly captured according to the Trust Framework.

## Phase 4: API & Human Oversight Simulation
- Build API endpoints (REST/GraphQL) to receive signals and feedback.
- Build endpoints to query the current Incident state and Intelligence Engine rationale.
- Implement the `ConfirmAction` command handler to simulate Human Oversight.

## Phase 5: Demo Integration & Polish
- Wire the complete Risk Evolution pipeline for the "Elderly Neighbor" scenario.
- Create seed scripts/runners to simulate the timeline of events.
- Audit the logs to ensure explainability, Human-Centered AI coordination, and event traceability are perfect.
- Final documentation updates.
