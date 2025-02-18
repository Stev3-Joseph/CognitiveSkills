from pydantic import BaseModel

class response_model(BaseModel):
    qNumber: int
    answer: int

class StudentAnswer(BaseModel):
    userId: str
    sessionId: str
    section: str
    answers: list[response_model]
    timeTaken: int


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