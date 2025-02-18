from fastapi import FastAPI
from endpoint import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Assessment API")
app.include_router(router, prefix="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uvicorn main:app --reload
# myenv\Scripts\activate 
# pip freeze > requirement.txt

