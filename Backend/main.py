from fastapi import FastAPI
from pydantic import BaseModel
import supabase
import os
from dotenv import load_dotenv
app = FastAPI()

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

class TestResult(BaseModel):
    student_name: str
    age: int
    verbal_score: int
    non_verbal_score: int
    math_score: int

@app.post("/submit-test/")
def submit_test(result: TestResult):
    data = result.dict()
    response = supabase_client.table("test_results").insert(data).execute()
    return {"status": "success", "message": "Test submitted!"}
