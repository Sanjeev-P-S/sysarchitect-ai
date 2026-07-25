from pydantic import BaseModel


class GraphNode(BaseModel):
    id: str
    label: str


class GraphEdge(BaseModel):
    source: str
    target: str


class ArchitectureGraph(BaseModel):
    nodes: list[GraphNode]
    edges: list[GraphEdge]