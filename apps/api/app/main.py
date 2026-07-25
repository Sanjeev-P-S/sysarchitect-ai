from fastapi import FastAPI

from app.graph.builder import GraphBuilder
from app.schemas.diagram import DiagramRequest

app = FastAPI(title="SysArchitect.ai API")


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/evaluate")
def evaluate_diagram(request: DiagramRequest):
    graph = GraphBuilder.build(request)

    return {
        "message": "Architecture graph created successfully",
        "graph": graph.model_dump(),
    }