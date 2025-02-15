from pydantic import BaseModel

class StudentAnswer(BaseModel):
    student_id: int
    question_id: int
    selected_answer: int

class SectionTime(BaseModel):
    student_id: int
    section_id: int
    time_spent_seconds: int
