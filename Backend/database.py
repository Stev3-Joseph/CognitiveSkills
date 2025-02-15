from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# print (SUPABASE_URL)
# print (SUPABASE_KEY)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


