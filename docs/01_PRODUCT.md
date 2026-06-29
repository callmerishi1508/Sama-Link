# Product Strategy and Definition

## Project Philosophy
Technology should never replace human judgment. Technology should amplify human capability.

## Vision
To be the defining intelligence engine that transforms fragmented human and system signals into coordinated, explainable, and decisive action.

## Mission
To empower responders and caregivers by providing Human-Centered AI insights that adapt to evolving situations while keeping humans firmly in control of high-stakes decisions.

## Problem Statement
In critical human-centric situations (e.g., community care, emergency response), information arrives in fragments. Existing systems either passively log this data without analysis (dashboards) or provide generic, opaque advice (chatbots). The lack of continuous, context-aware synthesis leads to missed early-warning signs and delayed interventions.

## Solution
An AI Action Intelligence Platform that ingests signals, continuously recalculates risk using an event-driven model, provides explainable Action Recommendations, and coordinates human response. The system adapts its Risk Evolution dynamically as new information is confirmed by human actors. The AI recommends; humans approve high-consequence actions; the system coordinates.

## User Personas
1. **The Reporter:** A community member, neighbor, or automated sensor generating the initial signal of concern.
2. **The Responder:** A designated individual (family member, volunteer, or professional) who acts on the system's Action Recommendation and provides ground-truth feedback.
3. **The Administrator / Human Oversight:** System supervisors who review explainability logs and ensure the Intelligence Engine is functioning safely and ethically.

## Trust Framework
To build confidence in the system, we implement a strict sequence of operations:
AI Understanding → Risk Assessment → Action Recommendation → Confidence → Evidence → Human Decision → Coordinated Action

This framework improves trust, transparency, and accountability by ensuring that every recommendation is traceable to evidence and that the final decision rests with a human.

## User Journey
1. **Signal Intake:** A fragmented report is received.
2. **Context Analysis:** The Intelligence Engine evaluates the report against historical context and current state.
3. **Action Recommendation:** The Intelligence Engine recommends an action with a clear, explainable rationale.
4. **Human Oversight:** A Responder reviews and approves the recommendation, performs the action, and logs the outcome.
5. **Risk Evolution:** The system ingests the Responder's feedback, continuously recalculating the risk level, and either closes the loop or recommends escalation.

## MVP Scope
- Ingestion of discrete event signals.
- Intelligence Engine for risk assessment and explainability.
- Event Store and state management.
- Human Oversight confirmation endpoints.
- A single evolving incident demo (see Demo Story).

## Real vs Simulated
Clearly distinguishing what is real vs simulated allows us to focus on the core value proposition (the Intelligence Engine) without being blocked by complex third-party API approvals.

| Component | Status | Description |
|-----------|--------|-------------|
| Intelligence Engine | **Real** | Evaluates context, assesses risk, and recommends actions |
| Event Store | **Real** | Immutable event-driven state management |
| Risk Evolution | **Real** | Continuous recalculation of risk based on events |
| Voice Input | **Simulated** | Replaced by mocked HTTP requests/scripts |
| Maps | **Simulated** | Mocked geographical data |
| Timeline | **Simulated** | Scripted event generation for demo purposes |
| Emergency Dispatch | **Simulated** | Mocked output rather than live 911 CAD integration |
| Volunteer Network | **Simulated** | Mocked human responders |
| Family Notification | **Simulated** | Mocked SMS/Email sending |
| External Agencies | **Simulated** | Mocked third-party systems |

## Demo Story: The Evolving Incident
1. **Initial Signal:** A neighbor reports that an elderly woman, who normally checks in every morning, has not been seen today.
2. **First Assessment:** The Intelligence Engine analyzes the context (routine deviation) and recommends a low-friction action: volunteer or family follow-up.
3. **Human Feedback:** A volunteer responder visits and confirms the woman has collapsed.
4. **Risk Evolution:** The Intelligence Engine ingests this critical update, continuously recalculating the risk to 'Critical', explains why the risk changed (medical emergency confirmed), and recommends immediate emergency escalation, pending Human Oversight.

### Example Risk Evolution Timeline
- **09:00:** Neighbor reports silence → **Medium Risk** → Recommend Volunteer Check-in
- **09:08:** Volunteer confirms collapse → **Critical Risk** → Recommend Emergency Dispatch

Risk is continuously recalculated rather than statically assigned, adapting to the truth on the ground.

## Demo Success Criteria
- **Judge understands project:** <30 seconds
- **First "wow" moment:** <20 seconds
- **Live demo duration:** ~90 seconds
- **Pitch duration:** 5 minutes

These criteria drive scope decisions, ensuring we build a high-impact, focused MVP rather than a sprawling feature set.
