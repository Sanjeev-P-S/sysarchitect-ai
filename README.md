# SysArchitect.AI
Design system architectures, explain your choices, and get instant, AI-powered actionable feedback.

## Development Progress

### ✅ Phase 1 – Backend Initialization

- Initialized FastAPI backend
- Configured Python virtual environment
- Added backend project structure
- Added health check endpoint
- Enabled Swagger documentation

### ✅ Phase 2 - Interactive Diagram Editor
- Next.js 15 frontend
- React Flow canvas
- Predefined architecture nodes
- Node creation
- Edge creation
- Drag & drop
- Delete nodes

### ✅ Phase 3 - Architecture Graph Builder

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
