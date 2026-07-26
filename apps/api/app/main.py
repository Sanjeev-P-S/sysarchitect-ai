from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.graph.builder import GraphBuilder
from app.rules.engine import RuleEngine
from app.schemas.diagram import DiagramRequest
from dotenv import load_dotenv

from app.llm.prompts import hello_prompt

from app.coverage.analyzer import CoverageAnalyzer

from app.evaluation.builder import EvaluationBuilder

load_dotenv()


app = FastAPI(title="SysArchitect.ai API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "healthy"}

from app.llm.gemini import GeminiClient
@app.get("/llm-test")
def llm_test():
    response = GeminiClient.generate(
        hello_prompt()
    )

    return {
        "response": response
    }


@app.post("/evaluate")
def evaluate_diagram(request: DiagramRequest):
    graph = GraphBuilder.build(request)

    rule_result = RuleEngine.evaluate(graph)
    coverage = CoverageAnalyzer.analyze(graph)
    evaluation = EvaluationBuilder.build(
    rule_result,
    coverage,
    )
    return evaluation.model_dump()