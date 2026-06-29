# Architectural Decisions Record (ADR)

## ADR 001: Event Store / Event-Driven Architecture
**Context:** SAMA LINK needs to track how a situation evolves over time and explain *why* the Intelligence Engine recommended a decision at a specific moment.
**Decision:** We will use an event-driven architecture (append-only Event Store) as the primary source of truth.
**Reason:** Traditional CRUD overwrites historical state. Event sourcing preserves the exact context the Intelligence Engine saw when making an Action Recommendation, which is legally and ethically required for an Action Intelligence platform.

## ADR 002: Intelligence Engine Provider Abstraction
**Context:** The AI ecosystem is moving rapidly. Hardcoding OpenAI or Anthropic SDKs creates vendor lock-in.
**Decision:** Create a generic `IntelligenceProvider` interface in the core domain. Infrastructure will implement this interface.
**Reason:** Allows us to hot-swap models, use local models for privacy-sensitive data, and prevents framework lock-in.

## ADR 003: Human Oversight for High-Consequence Actions
**Context:** The Intelligence Engine will evaluate critical, potentially life-threatening situations.
**Decision:** The Intelligence Engine is strictly forbidden from executing irreversible external actions (like dispatching an ambulance). It can only emit `ActionRecommended` events.
**Reason:** AI hallucinations or missing context could lead to severe consequences. Human-Centered AI means a human must explicitly approve escalations, generating a `HumanConfirmation` event that triggers the actual infrastructure side-effect. The Intelligence Engine recommends; humans approve; the system coordinates.

## ADR 004: Simulated Integrations for MVP
**Context:** The MVP needs to demonstrate end-to-end functionality without being bogged down by complex third-party API approvals (e.g., 911 CAD systems, SMS gateways).
**Decision:** All external system outputs will be simulated via mock adapters in the infrastructure layer.
**Reason:** Accelerates development and focuses the MVP on proving the core value proposition: the Risk Evolution and Intelligence Engine.

## ADR 005: One Evolving Incident for Demo
**Context:** We need a constrained way to prove the architecture works.
**Decision:** The MVP will hardcode/focus on a single narrative: the missing elderly neighbor who is later found collapsed.
**Reason:** This scenario perfectly demonstrates baseline context, low-level intervention, feedback ingestion, Risk Evolution, and Human Oversight without requiring a massive, generalized dataset.
