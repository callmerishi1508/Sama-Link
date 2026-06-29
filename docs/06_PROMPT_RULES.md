# Prompt Rules for AI Agents

When executing future implementation prompts for SAMA LINK, AI agents MUST follow these instructions:

## 1. Context Gathering First
- Before writing any code, **READ** all documents in the `docs/` directory.
- Understand the Clean Architecture constraints, Project Philosophy, and the Event-Driven Architecture.

## 2. Strict Adherence to Constitution
- Do not introduce libraries, frameworks, or patterns that violate `03_DEVELOPER_CONSTITUTION.md`.
- Do not bypass the `IntelligenceProvider` abstraction.
- Do not create CRUD schemas; use the Event Store pattern.

## 3. When to Stop
- Stop exactly when the objective of the specific prompt is met. 
- Do NOT hallucinate the next phase or start writing code for the next milestone unless explicitly instructed.

## 4. How to Report Work
- Output a clear summary of the files created or modified.
- Detail how the implementation satisfies the architectural decisions.
- Note any edge cases encountered and how they were handled.

## 5. When to Ask Questions
- If a prompt asks you to implement a feature that contradicts `02_ARCHITECTURE.md` or `04_DECISIONS.md`, **STOP**.
- Explicitly state the contradiction to the user and ask for clarification before proceeding.

## 6. Definition of Done for a Prompt
- Code compiles and adheres to linting rules.
- Unit tests are included and pass.
- Architecture boundaries are respected.
- No direct side-effects are hidden in the domain layer.

## 7. Quality Checklist
- [ ] Are events immutable in the Event Store?
- [ ] Is the Intelligence Engine provider abstracted?
- [ ] Is the AI Response Contract returned and logged?
- [ ] Is Human Oversight required for high-consequence Action Recommendations?

## 8. Output Format
- Provide the file tree of changes.
- Provide the code blocks (or use the appropriate file-writing tools).
- Conclude with a "Status Report" summarizing readiness for the next milestone.
