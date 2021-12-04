import uvicorn
import uuid 

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import models_pb2 as models

# Initialize the fastAPI application.
app = FastAPI()

# Allow CORS witj the application.
origins = ["*"]
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

# def init_room():
#     random_id = uuid.uuid4()
#     room = models.Room()
#     room.id = random_id
#     room.tracks = 3
#     room.speed = 1
#     room.name

def init_server():
  s = models.Server()
  s.capacity = 4
  return s

# Create the root server for the application. This maps 
# UUIDs -> Rooms, which allow us to handle our room management
# across all the tracks being created and updated.
server = init_server()

@app.get("/")
def read_root():
  return {"Hello": "World", "Server Capacity": server.capacity}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
  return {"item_id": item_id, "q": q}


def start():
  """Launched with `poetry run start` at root level"""
  uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)