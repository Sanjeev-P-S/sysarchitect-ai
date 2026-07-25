from app.graph.models import (
    ArchitectureGraph,
    GraphEdge,
    GraphNode,
)
from app.schemas.diagram import DiagramRequest


class GraphBuilder:
    @staticmethod
    def build(diagram: DiagramRequest) -> ArchitectureGraph:
        nodes = [
            GraphNode(
                id=node.id,
                label=node.data.label,
            )
            for node in diagram.nodes
        ]

        edges = [
            GraphEdge(
                source=edge.source,
                target=edge.target,
            )
            for edge in diagram.edges
        ]

        return ArchitectureGraph(
            nodes=nodes,
            edges=edges,
        )