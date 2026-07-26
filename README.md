# SysArchitect.AI
Design system architectures, explain your choices, and get instant, AI-powered actionable feedback.

## Development Progress

### Phase 1 – Backend Initialization

- Initialized FastAPI backend
- Configured Python virtual environment
- Added backend project structure
- Added health check endpoint
- Enabled Swagger documentation

### Phase 2 - Interactive Diagram Editor
- Next.js 15 frontend
- React Flow canvas
- Predefined architecture nodes
- Node creation
- Edge creation
- Drag & drop
- Delete nodes

### Phase 3 - Architecture Graph Builder

Implemented the backend pipeline for converting frontend React Flow diagrams into an internal architecture graph representation.

#### Completed

- Defined a stable API contract using Pydantic schemas
- Added `POST /evaluate` endpoint
- Implemented request validation for diagram nodes and edges
- Created an internal `ArchitectureGraph` domain model
- Built a dedicated `GraphBuilder` to transform React Flow JSON into the internal graph representation
- Removed frontend-specific metadata (positions, styling, etc.) from the backend model
- Verified end-to-end communication between the frontend and backend using Swagger

#### Backend Pipeline

```
React Flow Diagram
        │
        ▼
DiagramRequest (Pydantic)
        │
        ▼
GraphBuilder
        │
        ▼
ArchitectureGraph
```

#### Current Capabilities

- Accepts architecture diagrams through the `/evaluate` API
- Validates request payloads
- Converts diagrams into a clean, backend-independent graph model
- Provides the foundation for deterministic rule evaluation and AI-powered feedback

#### Engineering Decisions

- Kept the backend independent of React Flow by introducing a domain-specific graph model.
- Isolated graph construction inside a dedicated `GraphBuilder` to keep parsing logic separate from business logic.
- Used Pydantic models to establish a stable API contract between the frontend and backend.
- Designed the graph model as the single source of truth for all future evaluation modules (Rule Engine, Coverage Analyzer, and LLM Feedback).

### Phase 4 - Deterministic Rule Engine

Implemented the first version of the architecture evaluation engine using deterministic validation rules.

#### Completed

- Designed a structured rule evaluation model
- Added severity levels using enums (Low, Medium, High)
- Implemented a modular Rule Engine
- Added five deterministic architectural validation rules:
  - Missing Load Balancer
  - Missing Cache
  - Single Application Server
  - Public Database Exposure
  - Single Point of Failure
- Integrated the Rule Engine into the evaluation pipeline
- Verified all validation rules using Swagger API tests

#### Evaluation Pipeline

```
React Flow Diagram
        │
        ▼
DiagramRequest
        │
        ▼
GraphBuilder
        │
        ▼
ArchitectureGraph
        │
        ▼
RuleEngine
        │
        ▼
RuleResult
```

#### Engineering Decisions

- Separated each validation rule into its own function following the Single Responsibility Principle.
- Designed the Rule Engine to execute validators independently, making it easy to add or remove rules.
- Returned structured `RuleViolation` objects instead of plain strings to support future expansion.
- Kept the evaluation logic deterministic and independent of the LLM, allowing AI to focus solely on explanation and feedback.

## Phase 5 – Gemini LLM Integration

### Completed

- Integrated Google Gemini API with FastAPI.
- Configured secure API key loading using `.env`.
- Implemented reusable `GeminiClient`.
- Added prompt management module.
- Successfully verified end-to-end LLM communication.
- Established the AI feedback pipeline for architectural evaluation.

### Current Flow

React Flow
→ Graph Builder
→ Rule Engine
→ Gemini

## Phase 6 – URL Shortener Coverage Analyzer

### Completed

- Implemented deterministic concept coverage analysis for the URL Shortener interview problem.
- Added Coverage Analyzer module.
- Detects required architectural components:
  - Client
  - Load Balancer
  - Application Server
  - Cache
  - Database
- Calculates architecture coverage percentage.
- Identifies covered concepts.
- Identifies missing concepts.
- Integrated coverage analysis into the `/evaluate` API response.

### Current Evaluation Pipeline

React Flow
→ Graph Builder
→ Rule Engine
→ Coverage Analyzer
→ Gemini (Ready)

## Phase 7 – Evaluation Builder

### Completed

- Implemented Evaluation Builder.
- Combined Rule Engine and Coverage Analyzer into a single evaluation object.
- Calculated an overall architecture score.
- Generated strengths based on detected architectural concepts.
- Generated weaknesses from deterministic rule violations.
- Included missing concepts in the final evaluation.
- Established the structured object that will be passed to the LLM.

### Current Evaluation Pipeline

React Flow
→ Graph Builder
→ Rule Engine
→ Coverage Analyzer
→ Evaluation Builder
→ Gemini

# Phase 8 — Frontend Integration & Professional UI

## Objective

Integrate the React frontend with the FastAPI backend to create a complete end-to-end architecture evaluation workflow while improving the application's user interface.

---

## Completed

### Frontend ↔ Backend Integration

- Connected React Flow editor to the FastAPI evaluation API
- Implemented API communication using `fetch()`
- Added request serialization for architecture diagrams
- Displayed evaluation results directly in the frontend
- Configured CORS for frontend-backend communication

---

### Dynamic Architecture Evaluation

Instead of sending a sample diagram, the frontend now sends the actual architecture built by the user.

Workflow:

User builds architecture

↓

React Flow

↓

Serialize Nodes & Edges

↓

POST `/evaluate`

↓

FastAPI Backend

↓

Rule Engine

↓

Coverage Analyzer

↓

Evaluation Builder

↓

Frontend Results Panel

---

### Evaluation Dashboard

The frontend now displays:

- Overall Architecture Score
- Coverage Score
- Architecture Strengths
- Rule Violations
- Missing Concepts
- Architecture Weaknesses

---

### UI Improvements

Implemented a cleaner and more professional interface.

#### Landing Section

- Improved typography
- Better spacing
- Modern color palette
- Cleaner layout hierarchy

#### Interview Card

- Redesigned interview question card
- Improved button styling
- Better shadows and rounded corners

#### Canvas

- Improved page spacing
- Better component alignment
- Cleaner dashboard layout

#### Results Panel

- Organized evaluation into sections
- Better readability
- Consistent styling
- Card-based presentation

---

## Architecture

```
React Flow Editor
        │
        ▼
Frontend Serializer
        │
        ▼
POST /evaluate
        │
        ▼
FastAPI Backend
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
Rule Engine   Coverage Analyzer
 │                │
 └──────┬─────────┘
        ▼
Evaluation Builder
        │
        ▼
JSON Response
        │
        ▼
Evaluation Dashboard
```

---

## Features Completed

- Interactive React Flow editor
- Live architecture evaluation
- Backend integration
- Dynamic node serialization
- Overall architecture scoring
- Rule-based analysis
- Coverage analysis
- Professional evaluation dashboard
- Responsive UI improvements

---

## Status

✅ End-to-End Evaluation Pipeline

✅ React ↔ FastAPI Communication

✅ Professional Dashboard

✅ Live Architecture Evaluation

✅ Interactive System Design Canvas

---

## Git Commit

```
implemented frontend integration and professional evaluation dashboard
```
