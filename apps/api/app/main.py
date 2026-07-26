from fastapi import FastAPI

from app.graph.builder import GraphBuilder
from app.rules.engine import RuleEngine
from app.schemas.diagram import DiagramRequest
from dotenv import load_dotenv

from app.llm.prompts import hello_prompt

load_dotenv()


app = FastAPI(title="SysArchitect.ai API")


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

    return {
        "message": "Diagram evaluated successfully",
        "graph": graph.model_dump(),
        "rule_result": rule_result.model_dump(),
    }