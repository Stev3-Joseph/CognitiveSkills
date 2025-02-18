from pydantic import BaseModel

class StudentAnswer(BaseModel):
    student_id: str
    question_id: int
    selected_answer: int

class SectionTime(BaseModel):
    student_id: str
    section_id: int
    time_spent_seconds: int
    

class UserSignup(BaseModel):
    name: str
    age: int
    standard: int
    mobile: int
    date_of_birth: str
    school: str

class UserLogin(BaseModel):
    name: str
    mobile: int
    date_of_birth: str