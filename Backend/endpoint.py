from fastapi import APIRouter, HTTPException, Depends
from database import supabase
import logging
logging.basicConfig(level=logging.INFO)

from auth import hash_session_id,verify_session, create_jwt, verify_jwt

from models import StudentAnswer, UserSignup, UserLogin, Feedback

import secrets
import datetime

router = APIRouter()

#session validation
@router.post("/session", response_model=dict)
async def validate_session(session_id: str):
    try:
        response = supabase.table("Sessions").select("session_id").eq("session_id", session_id).execute()
        is_valid = len(response.data) > 0
        
        return {
            "valid": is_valid
        }
    except Exception as e:
        # Log the exception but return a clean response
        print(f"Error validating session: {str(e)}")
        return {
            "valid": False
        }

@router.post("/feedback", response_model=dict)
async def submit_feedback(feedback: Feedback):
    try:
        response = supabase.table("Feedback").insert({
            "name": feedback.name,
            "mobile": feedback.mobile,
            "email": feedback.email,
            "query": feedback.query
        }).execute()

        return {"success": True, "message": "Feedback submitted successfully"}
    except Exception as e:
        print(f"Error submitting feedback: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit feedback")

#check if user has completed a  section from Student_Section_Time table
@router.post("/section", response_model=dict)
async def check_section_completion(user_id: str, section: str):
    response = supabase.table("Student_Section_Time").select("*").eq("student_id", user_id).eq("section", section).execute()
    
    return {
        "message": "Section completion status",
        "completed": bool(response.data)
    }

@router.post("/submit", response_model=dict)
async def submit_answers(student_answer: StudentAnswer):
    try:
        # Validate if the session exists
        session_check = supabase.table("Sessions").select("session_id").eq("session_id", student_answer.sessionId).execute()
        if not session_check.data:
            raise HTTPException(status_code=404, detail="Session does not exist")
        
        # Extract question IDs from the request
        question_numbers = [response.qNumber for response in student_answer.answers]

        # Fetch correct answers for all given question numbers
        response = supabase.table("Questions").select("question_id, correct_answer").in_("question_id", question_numbers).execute()
        question_data = {q["question_id"]: q["correct_answer"] for q in response.data}
        
        if not question_data:
            raise HTTPException(status_code=404, detail="Questions not found")
        
        # Prepare bulk insert data for answers
        insert_data = []
        results = []

        for answer in student_answer.answers:
            if answer.qNumber not in question_data:
                continue  # Skip if question not found
            
            is_correct = question_data[answer.qNumber] == answer.answer
            
            insert_data.append({
                "answer_id": answer.qNumber,
                "student_id": student_answer.userId,
                "section": student_answer.section,
                "question_id": answer.qNumber,
                "selected_answer": answer.answer,
                "is_correct": is_correct
            })
            
            results.append({
                "qNumber": answer.qNumber,
                "is_correct": is_correct
            })
        
        if not insert_data:
            raise HTTPException(status_code=400, detail="No valid answers to insert")
        
        # Insert all answers in one go
        insert_response = supabase.table("Student_Answers").insert(insert_data).execute()

        # Record time taken for this section in Student_Section_Time table
        time_data = {
            "student_id": student_answer.userId,
            "section": student_answer.section,
            "time_spent_seconds": student_answer.timeTaken
        }
        time_response = supabase.table("Student_Section_Time").insert(time_data).execute()

        # Determine current_section for the next step
        section_order = {"A": "B", "B": "C", "C": "D"}
        current_section = section_order.get(student_answer.section)

        # If the section is 'D', check if A, B, and C have been completed
        if student_answer.section == "D":
            completed_sections = supabase.table("Student_Section_Time").select("section").eq("student_id", student_answer.userId).in_("section", ["A", "B", "C"]).execute()
            completed_section_names = {s["section"] for s in completed_sections.data}

            # If A, B, and C are all present, mark Test_Completed as true
            if {"A", "B", "C"}.issubset(completed_section_names):
                supabase.table("Test_Completed").upsert({
                    "student_id": student_answer.userId,
                    "completed": True
                }).execute()
            
            return {
                "status": "success",
                "inserted_count": len(insert_response.data),
                "results": results,
                "time_recorded": bool(time_response.data)
            }

        return {
            "status": "success",
            "inserted_count": len(insert_response.data),
            "results": results,
            "time_recorded": bool(time_response.data),
            "current_section": current_section
        }
    except HTTPException as he:
        raise he  # Re-raise HTTP exceptions as-is
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))





@router.post("/signup", response_model=dict)
async def signup(user: UserSignup):
    logging.info(f"Received payload: {user.dict()}")
    print(f"Received payload: {user.dict()}")
    # Check if a user with the same name, mobile, and date_of_birth exists
    existing_user = supabase.table("Users").select("*")\
        .eq("name", user.name)\
        .eq("mobile", user.mobile)\
        .eq("date_of_birth", user.date_of_birth)\
        .execute()

    if existing_user.data:
        raise HTTPException(status_code=400, detail="User already exists with the same name, mobile, and date of birth")


    # First, insert into Users table
    user_response = supabase.table("Users").insert({
        "name": user.name,
        "age": user.age,
        "standard": user.standard,
        "mobile": user.mobile,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "date_of_birth": user.date_of_birth,
        "state": user.state
    }).execute()
    
    # Get the newly created user_id
    new_user_id = user_response.data[0]["user_id"]
    
    # Then, insert into Students table
    student_response = supabase.table("Students").insert({
        "student_id": new_user_id,  # Use the same ID for consistency
        "name": user.name,
        "age": user.age,
        "grade_level": user.standard , # Assuming 'standard' is equivalent to 'grade_level'
        "state": user.state
    }).execute()

    return {
        "message": "User registered successfully",
        "user_id": new_user_id,
        "created_at": user_response.data[0]["created_at"],
        "student_id": student_response.data[0]["student_id"]
    }

@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    # Fetch user from Users table
    db_user = supabase.table("Users").select("user_id, mobile, created_at, date_of_birth")\
        .ilike("name", user.name).eq("mobile", user.mobile).eq("date_of_birth", user.date_of_birth).execute()
    
    if not db_user.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_data = db_user.data[0]
    user_id = user_data["user_id"]
    date_of_birth = user_data["date_of_birth"]

    # Check if user exists in Test_Completed table
    test_status = supabase.table("Test_Completed").select("completed").eq("student_id", user_id).execute()
    
    if not test_status.data:
        supabase.table("Test_Completed").insert({"student_id": user_id, "completed": False}).execute()
        completed_status = False
    else:
        completed_status = test_status.data[0]["completed"]
    
    current_section = None
    if not completed_status:
        student_section = supabase.table("Student_Section_Time").select("section").eq("student_id", user_id).execute()
        
        if not student_section.data:
            current_section = "A"
        else:
            sections = [entry["section"] for entry in student_section.data]
            if "C" in sections:
                current_section = "D"
            elif "B" in sections:
                current_section = "C"
            elif "A" in sections:
                current_section = "B"
    
    # Check for existing active session
    existing_session = supabase.table("Sessions").select("session_id, token")\
        .eq("user_id", user_id).gt("expires_at", datetime.datetime.utcnow().isoformat()).execute()
    
    if existing_session.data:
        session_data = existing_session.data[0]
        response = {
            "message": "Already logged in",
            "token": session_data["token"],
            "session_id": session_data["session_id"],
            "user": {
                "user_id": user_id,
                "name": user.name,
                "mobile": user.mobile,
                "date_of_birth": date_of_birth,
                "created_at": user_data["created_at"]
            },
            "test_completed": completed_status
        }
        if not completed_status:
            response["current_section"] = current_section
        return response
    
    # Create a new session
    created_at = datetime.datetime.utcnow().isoformat()
    session_id = secrets.token_hex(32)
    hashed_session = hash_session_id(session_id)
    jwt_token = create_jwt(str(user_id))
    
    supabase.table("Sessions").insert({
        "session_id": hashed_session,
        "user_id": user_id,
        "token": jwt_token,
        "created_at": created_at,
        "expires_at": (datetime.datetime.utcnow() + datetime.timedelta(days=7)).isoformat()
    }).execute()
    
    response = {
        "message": "Login successful",
        "token": jwt_token,
        "session_id": hashed_session,
        "user": {
            "user_id": user_id,
            "name": user.name,
            "mobile": user.mobile,
            "date_of_birth": date_of_birth,
            "created_at": created_at
        },
        "test_completed": completed_status
    }
    if not completed_status:
        response["current_section"] = current_section
    
    return response


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
    
    response = supabase.table("Sessions").delete().eq("session_id", session_id).execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Session not found")

    return {
        "message": "Logout successful"
    }

    
#to avoid 127.0.0.1:54887 - "GET / HTTP/1.1" 404 Not Found
@router.get("/")
async def root():
    return {"message": "Hello World"}


