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
