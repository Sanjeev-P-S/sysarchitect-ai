from app.graph.models import ArchitectureGraph
from app.rules.models import RuleViolation, Severity


def validate_missing_load_balancer(graph: ArchitectureGraph):
    if not any(node.label == "Load Balancer" for node in graph.nodes):
        return RuleViolation(
            rule_id="missing_load_balancer",
            severity=Severity.HIGH,
            message="No Load Balancer detected.",
        )
    return None


def validate_missing_cache(graph: ArchitectureGraph):
    if not any(node.label == "Cache" for node in graph.nodes):
        return RuleViolation(
            rule_id="missing_cache",
            severity=Severity.MEDIUM,
            message="No Cache layer detected.",
        )
    return None


def validate_single_application_server(graph: ArchitectureGraph):
    count = sum(
        node.label == "Application Server"
        for node in graph.nodes
    )

    if count == 1:
        return RuleViolation(
            rule_id="single_application_server",
            severity=Severity.MEDIUM,
            message="Only one Application Server detected.",
        )

    return None


def validate_public_database(graph: ArchitectureGraph):
    labels = {
        node.id: node.label
        for node in graph.nodes
    }

    for edge in graph.edges:
        if (
            labels.get(edge.source) == "Client"
            and labels.get(edge.target) == "Database"
        ):
            return RuleViolation(
                rule_id="public_database",
                severity=Severity.HIGH,
                message="Database is directly accessible from the Client.",
            )

    return None


def validate_single_point_of_failure(graph: ArchitectureGraph):
    labels = {
        node.id: node.label
        for node in graph.nodes
    }

    app_servers = [
        node
        for node in graph.nodes
        if node.label == "Application Server"
    ]

    if len(app_servers) == 1:
        for edge in graph.edges:
            if (
                labels.get(edge.source) == "Load Balancer"
                and edge.target == app_servers[0].id
            ):
                return RuleViolation(
                    rule_id="single_point_of_failure",
                    severity=Severity.HIGH,
                    message="Load Balancer routes to only one Application Server.",
                )

    return None