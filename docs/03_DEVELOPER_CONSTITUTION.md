# Developer Constitution

This document defines the permanent engineering foundation for SAMA LINK. All contributors must adhere to these rules.

## Project Philosophy
Technology should never replace human judgment. Technology should amplify human capability.

## Coding Standards
- **Language:** TypeScript/Node.js (or specified primary language).
- **Style Guide:** Enforced via strict ESLint and Prettier configurations.
- **Immutability:** Favor immutable data structures, especially for Domain Events in the Event Store.
- **Pure Functions:** Business logic should be pure functions where possible, isolating side effects to the Infrastructure layer.

## Naming Conventions
- **Events:** Past tense verbs (e.g., `IncidentReported`, `RiskEscalated`).
- **Commands:** Imperative verbs (e.g., `AssessRisk`, `ConfirmAction`).
- **Interfaces:** Prefix with `I` (e.g., `IIntelligenceProvider`) or use descriptive nouns depending on ecosystem norms, but remain consistent.
- **Files:** `kebab-case.ts` for files; `PascalCase` for classes.

## Folder Structure (Clean Architecture)
```
src/
├── domain/           # Entities, Events, Value Objects, Interfaces
├── application/      # Use Cases, Command/Query Handlers
├── infrastructure/   # DB Adapters, Intelligence Engine Providers, Event Bus
├── interfaces/       # API Routes, Controllers, DTOs
└── shared/           # Utilities, common types
```

## API Principles
- **RESTful/Resource-Oriented:** Clear segregation between reads (Queries) and writes (Commands).
- **Idempotency:** All state-mutating endpoints must be idempotent.
- **Validation:** Strict payload validation at the boundary (e.g., Zod or class-validator).

## Intelligence Engine Integration Rules
- **No Direct Calls in Domain:** The Domain layer must NEVER import an SDK from OpenAI, Anthropic, etc.
- **Provider Abstraction:** All Intelligence Engine interactions occur through ports defined in the Application/Domain layer and implemented in the Infrastructure layer.
- **Graceful Degradation:** Intelligence Engine timeouts or failures must be caught and handled gracefully (e.g., defaulting to Human Oversight).
- **AI Response Contract:** All providers must return the formalized JSON schema containing confidence, reasoning, evidence, and recommended actions.

## Testing Rules
- **Unit Tests (80%+ Coverage):** Mandatory for all Domain logic and Application Use Cases.
- **Integration Tests:** Required for Infrastructure adapters (Event Store, mocked Intelligence Engine).
- **Test-Driven Development (TDD):** Highly encouraged for complex state transitions in the Risk Evolution logic.

## Git Rules
- **Branching:** `feature/short-description`, `bugfix/issue-id`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **Pull Requests:** Must pass CI (linting, tests) and require at least one review before merging into `main`.

## Security Rules
- **No Secrets in Code:** Use environment variables strictly.
- **Data Sanitization:** Sanitize all inputs before passing them to the Intelligence Engine to prevent prompt injection.
- **Auditability:** Do not mutate events. Treat the Event Store as an append-only ledger.

## Quality Gates
- Code cannot be merged if it violates Clean Architecture boundaries (e.g., Application layer importing an Express request object).
- The standardized AI Response Contract must be logged for every Action Recommendation in tests.
