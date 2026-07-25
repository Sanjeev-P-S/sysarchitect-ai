from fastapi import FastAPI

app = FastAPI(
    title="SysArchitect.ai API",
    description="AI-powered System Design Interview Evaluator",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "Welcome to SysArchitect.ai API"}


@app.get("/health")
def health():
    return {"status": "healthy"}