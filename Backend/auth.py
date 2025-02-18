import bcrypt
import jwt
import datetime
import os
from dotenv import load_dotenv
import secrets
from database import supabase

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "your_jwt_secret")
ALGORITHM = "HS256"
SESSION_EXPIRY_DAYS = 7

# Generate a hashed session ID
def hash_session_id(session_id: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(session_id.encode(), salt).decode()

# Verify if a session ID is valid
def verify_session(session_id: str, user_id: str) -> bool:  
    response = supabase.table("Sessions").select("session_id, expires_at").eq("user_id", user_id).execute()  

    if not response.data:  
        print("No session found for user_id:", user_id)  
        return False  # No session found  

    session_data = response.data[0]  
    stored_hashed_session = session_data["session_id"]  
    expires_at = datetime.datetime.strptime(session_data["expires_at"], "%Y-%m-%dT%H:%M:%S.%f")  

    if datetime.datetime.utcnow() > expires_at:  
        print("Session expired. Current time:", datetime.datetime.utcnow(), "Expires at:", expires_at)  
        return False  # Session expired  

    # Check if the session ID matches the stored hashed session  
    is_valid = session_id == stored_hashed_session
    if not is_valid:  
        print("Invalid session ID. Provided:", session_id, "Stored hash:", stored_hashed_session)  

    return is_valid  

# Generate JWT token
def create_jwt(user_id: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(days=SESSION_EXPIRY_DAYS)
    payload = {"user_id": user_id, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Verify JWT token
def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
