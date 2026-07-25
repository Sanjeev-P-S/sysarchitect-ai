from enum import Enum

from pydantic import BaseModel


class Severity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class RuleViolation(BaseModel):
    rule_id: str
    severity: Severity
    message: str


class RuleResult(BaseModel):
    violations: list[RuleViolation]