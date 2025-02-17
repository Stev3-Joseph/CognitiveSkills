from fastapi import APIRouter, HTTPException, Depends
from database import supabase

from auth import hash_session_id,verify_session, create_jwt, verify_jwt

from models import StudentAnswer, SectionTime , UserSignup, UserLogin

import secrets
import datetime

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

@router.post("/signup", response_model=dict)
async def signup(user: UserSignup):
    existing_user = supabase.table("Users").select("*").eq("mobile", user.mobile).execute()

    if existing_user.data:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    response = supabase.table("Users").insert({
        "name": user.name,
        "age": user.age,
        "standard": user.standard,
        "mobile": user.mobile,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "date_of_birth": user.date_of_birth,
        "school": user.school
        
    }).execute()

    return {
        "message": "User registered successfully",
        "user_id": response.data[0]["user_id"],
        "created_at": response.data[0]["created_at"]
    }
@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    # Updated query to include date_of_birth check
    db_user = supabase.table("Users").select("user_id, mobile, created_at, date_of_birth").eq("name", user.name).eq("mobile", user.mobile).eq("date_of_birth", user.date_of_birth).execute()

    if not db_user.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_data = db_user.data[0]
    user_id = user_data["user_id"]
    created_at = user_data["created_at"]
    date_of_birth = user_data["date_of_birth"]

    # Generate session ID and JWT
    session_id = secrets.token_hex(32)
    hashed_session = hash_session_id(session_id)
    jwt_token = create_jwt(str(user_id))

    # Store session in Supabase
    supabase.table("Sessions").insert({
        "session_id": hashed_session,
        "user_id": user_id,
        "token": jwt_token,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "expires_at": (datetime.datetime.utcnow() + datetime.timedelta(days=7)).isoformat()
    }).execute()

    return {
        "message": "Login successful",
        "token": jwt_token,
        "session_id": session_id,
        "user": {
            "user_id": user_id,
            "name": user.name,
            "mobile": user.mobile,
            "date_of_birth": date_of_birth,
            "created_at": created_at
        }
    }

@router.get("/protected", response_model=dict)
async def protected_route(token: str, session_id: str, user_id: str):
    valid_jwt = verify_jwt(token)
    valid_session = verify_session(session_id, user_id)

    if not valid_jwt :
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    elif not valid_session:
        raise HTTPException(status_code=401, detail="Invalid session")  

    return {
        "message": "You are authenticated",
        "user_id": user_id
    }

@router.post("/logout", response_model=dict)
async def logout(session_id: str):
    supabase.table("Sessions").delete().eq("session_id", session_id).execute()
    return {"message": "Logged out successfully"}

    
#to avoid 127.0.0.1:54887 - "GET / HTTP/1.1" 404 Not Found
@router.get("/")
async def root():
    return {"message": "Hello World"}


