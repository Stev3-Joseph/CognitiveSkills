from fastapi import APIRouter, HTTPException

from database import supabase

from models import StudentAnswer, SectionTime

router = APIRouter()

@router.post("/submit-answer/", response_model=dict)
async def submit_answers(answers: list[StudentAnswer]):
    try:
        # Extract question IDs from request
        question_ids = [answer.question_id for answer in answers]

        # Fetch correct answers for all given question IDs
        response = supabase.table("Questions").select("question_id, correct_answer").in_("question_id", question_ids).execute()
        question_data = {q["question_id"]: q["correct_answer"] for q in response.data}

        if not question_data:
            raise HTTPException(status_code=404, detail="Questions not found")

        # Prepare bulk insert data
        insert_data = []
        for answer in answers:
            if answer.question_id not in question_data:
                continue  # Skip if question not found

            is_correct = question_data[answer.question_id] == answer.selected_answer
            insert_data.append({
                "answer_id": answer.question_id,
                "student_id": answer.student_id,
                "question_id": answer.question_id,
                "selected_answer": answer.selected_answer,
                "is_correct": is_correct
            })

        if not insert_data:
            raise HTTPException(status_code=400, detail="No valid answers to insert")

        # Insert all answers in one go
        insert_response = supabase.table("Student_Answers").insert(insert_data).execute()

        return {
            "status": "success",
            "inserted_answers": insert_response.data,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/submit-time/", response_model=dict)
async def submit_section_time(section_time: SectionTime):  # Accepts a single object
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

