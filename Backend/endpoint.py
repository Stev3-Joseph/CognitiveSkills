from fastapi import APIRouter, HTTPException

from database import supabase

from models import StudentAnswer, SectionTime

router = APIRouter()

@router.post("/submit-answer/", response_model=dict)
async def submit_answer(answer: StudentAnswer):
    try:

        question = supabase.table("Questions").select("correct_answer").eq("question_id", answer.question_id).execute()

        if not question.data:
            raise HTTPException(status_code=404, detail="Question not found")
        
        # Check if answer is correct
        is_correct = question.data[0]['correct_answer'] == answer.selected_answer
        
        # Insert the answer
        response = supabase.table("Student_Answers").insert({
            "answer_id": answer.question_id,
            "student_id": answer.student_id,
            "question_id": answer.question_id,
            "selected_answer": answer.selected_answer,
            "is_correct": is_correct
        }).execute()
        
        return {
            "status": "success",
            "data": response.data[0],
            "is_correct": is_correct
        }
    except Exception as e:
        #key already exists
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/submit-time/", response_model=dict)
async def submit_section_time(section_time: SectionTime):
    try:
        response = supabase.table("Student_Section_Time").insert({
            "student_id": section_time.student_id,
            "section_id": section_time.section_id,
            "time_spent_seconds": section_time.time_spent_seconds
        }).execute()

        return {
            "status": "success",
            "data": response.data[0]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    
#to avoid 127.0.0.1:54887 - "GET / HTTP/1.1" 404 Not Found
@router.get("/")
async def root():
    return {"message": "Hello World"}

