from pydantic import BaseModel

class StudentAnswer(BaseModel):
    student_id: int
    question_id: int
    selected_answer: int

class SectionTime(BaseModel):
    student_id: int
    section_id: int
    time_spent_seconds: int
    

class UserSignup(BaseModel):
    name: str
    age: int
    standard: int
    mobile: int
    created_at: str
    date_of_birth: str

class UserLogin(BaseModel):
    name: str
    mobile: int
    date_of_birth: str