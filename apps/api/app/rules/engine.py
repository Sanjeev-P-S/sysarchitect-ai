from app.graph.models import ArchitectureGraph
from app.rules.models import RuleResult
from app.rules.validators import (
    validate_missing_cache,
    validate_missing_load_balancer,
    validate_public_database,
    validate_single_application_server,
    validate_single_point_of_failure,
)


class RuleEngine:
    @staticmethod
    def evaluate(graph: ArchitectureGraph) -> RuleResult:
        violations = []

        validators = [
            validate_missing_load_balancer,
            validate_missing_cache,
            validate_single_application_server,
            validate_public_database,
            validate_single_point_of_failure,
        ]

        for validator in validators:
            result = validator(graph)
            if result:
                violations.append(result)

        return RuleResult(
            violations=violations,
        )