from pydantic import BaseModel


class NodeData(BaseModel):
    label: str


class DiagramNode(BaseModel):
    id: str
    data: NodeData


class DiagramEdge(BaseModel):
    id: str
    source: str
    target: str


class DiagramRequest(BaseModel):
    nodes: list[DiagramNode]
    edges: list[DiagramEdge]