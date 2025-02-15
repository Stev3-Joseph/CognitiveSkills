from fastapi import FastAPI
from endpoint import router

app = FastAPI(title="Assessment API")
app.include_router(router, prefix="/api/v1")

# uvicorn main:app --reload