from app.coverage.models import CoverageResult
from app.evaluation.models import EvaluationResult
from app.rules.models import RuleResult


class EvaluationBuilder:

    @staticmethod
    def build(
        rule_result: RuleResult,
        coverage: CoverageResult,
    ) -> EvaluationResult:

        score = int(
            coverage.coverage_score
            - (len(rule_result.violations) * 10)
        )

        score = max(0, min(score, 100))

        strengths = []

        if coverage.covered_concepts:
            strengths.extend(
                [
                    f"Includes {concept}"
                    for concept in coverage.covered_concepts
                ]
            )

        weaknesses = [
            violation.message
            for violation in rule_result.violations
        ]

        return EvaluationResult(
            overall_score=score,
            rule_result=rule_result,
            coverage=coverage,
            strengths=strengths,
            weaknesses=weaknesses,
            missing_concepts=coverage.missing_concepts,
        )