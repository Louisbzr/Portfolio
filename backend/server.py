from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio')]

# App & Router
app = FastAPI(title="Portfolio Louis API")
api_router = APIRouter(prefix="/api")

# ─── Models ────────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime
    read: bool

# ─── Routes ────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Portfolio Louis API — Online ✓", "status": "ok"}

@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def create_contact(data: ContactCreate):
    """Save a contact message to MongoDB."""
    contact = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "message": data.message,
        "created_at": datetime.utcnow(),
        "read": False,
    }
    await db.contacts.insert_one(contact)
    return ContactResponse(**contact)

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contacts():
    """Retrieve all contact messages."""
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [ContactResponse(**c) for c in contacts]

@api_router.patch("/contact/{contact_id}/read")
async def mark_read(contact_id: str):
    """Mark a message as read."""
    result = await db.contacts.update_one(
        {"id": contact_id},
        {"$set": {"read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"status": "ok"}

# ─── App setup ─────────────────────────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
