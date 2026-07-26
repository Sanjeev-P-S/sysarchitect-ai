from pydantic import BaseModel

from app.coverage.models import CoverageResult
from app.rules.models import RuleResult


class EvaluationResult(BaseModel):
    overall_score: int
    rule_result: RuleResult
    coverage: CoverageResult
    strengths: list[str]
    weaknesses: list[str]
    missing_concepts: list[str]