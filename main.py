from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_engine import ask_ai
import json
from pathlib import Path
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(request: LoginRequest):
    # For demonstration purposes, we will use a hardcoded username and password.
    # In a real application, you would check against a database or authentication service.
    if request.username == "admin@ingres.ai" and request.password == "12345678":
        return {"message": "Login successful!"}
    else:
        return {"message": "Invalid username or password."}
# Load our groundwater dataset
DATA_FILE = Path("data/groundwater.json")

with open(DATA_FILE, "r", encoding="utf-8") as file:
    groundwater_data = json.load(file)

app=FastAPI(title="INGRES AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "INGRES AI Backend is running!"}
@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "INGRES AI"
    }
class ChatRequest(BaseModel):
    message: str
    language: str="en-IN"

@app.post("/api/chat")
def chat(chat_request: ChatRequest):

    # Send the user's question to the AI engine
    try:
        answer = ask_ai(
            chat_request.message,
            chat_request.language,
            groundwater_data
    )

    except Exception as e:
        print("AI ERROR:", e)
        fallback_messages = {
            "en-IN": "I'm currently unable to connect to the AI service. You can still use the groundwater map and status features.",
            "hi-IN": "अभी AI सेवा से कनेक्शन नहीं हो पा रहा है। आप फिर भी भूजल मानचित्र और भूजल स्थिति की सुविधाओं का उपयोग कर सकते हैं।",
            "pa-IN": "ਇਸ ਸਮੇਂ AI ਸੇਵਾ ਨਾਲ ਕਨੈਕਟ ਨਹੀਂ ਹੋ ਰਿਹਾ। ਤੁਸੀਂ ਫਿਰ ਵੀ ਭੂਜਲ ਨਕਸ਼ੇ ਅਤੇ ਭੂਜਲ ਸਥਿਤੀ ਦੀਆਂ ਸਹੂਲਤਾਂ ਵਰਤ ਸਕਦੇ ਹੋ।",
        }

    answer = fallback_messages.get(
        chat_request.language,
        fallback_messages["en-IN"]
    )

    # Send the AI response back to the frontend
    return {
        "answer": answer,
        "language": chat_request.language
    }
@app.get("/api/groundwater/{state}")
def get_groundwater(state: str):

    # Find the state in our groundwater dataset
    data = groundwater_data.get(state)

    # If the state doesn't exist, return an error
    if data is None:
        return {
            "error": "Groundwater data not available for this state."
        }

    # Return the state's groundwater information
    return {
        "state": state,
        "data": data
    }
@app.get("/api/groundwater/state/{state}")
def get_groundwater_state(
    state: str,
    language: str = "en-IN"
):

    # Find the requested state in the groundwater dataset
    data = groundwater_data.get(state)

    # If state is not available
    if data is None:
        return {
            "error": "Groundwater data not available for this state."
        }

    # Get extraction percentage
    stage = data.get(
        "stage_of_groundwater_extraction_percent",
        0
    )

    # Determine groundwater category
    if stage > 100:
        category = "Over-exploited"

    elif stage > 90:
        category = "Critical"

    elif stage > 70:
        category = "Semi-critical"

    else:
        category = "Safe"

    # Create a prompt for the AI.
    # The selected language is passed dynamically.
    prompt = f"""
You are INGRES AI, a groundwater-resource
assessment assistant for India.

Explain the groundwater situation of {state}
in the user's selected language.

Groundwater data:

State: {state}
Annual groundwater recharge: {data.get("annual_groundwater_recharge_bcm")} BCM
Annual groundwater extraction: {data.get("annual_groundwater_extraction_bcm")} BCM
Stage of groundwater extraction: {stage}%
Groundwater category: {category}

Explain in simple language:

1. What the groundwater condition means.
2. Whether the situation is safe or concerning.
3. What the extraction percentage means.
4. Give a short practical explanation that an ordinary
   citizen or farmer can understand.

IMPORTANT RULES:

- Respond ONLY in the selected language.
- Do NOT respond in English unless the selected language is English.
- Do NOT use Hindi unless Hindi is the selected language.
- Do NOT translate the numerical values.
- Keep the explanation concise.
- Do not invent or change any groundwater values.

Selected language:
{language}
"""

    # Ask the AI engine to generate the explanation
    # in the selected language.
    explanation = ask_ai(
        prompt,
        language,
        groundwater_data
    )

    # Return the data and multilingual explanation
    return {
        "location": state,
        "recharge": data.get(
            "annual_groundwater_recharge_bcm"
        ),
        "extraction": data.get(
            "annual_groundwater_extraction_bcm"
        ),
        "stage": stage,
        "category": category,
        "explanation": explanation,
        "language": language
    }