import uvicorn
import uuid 

from typing import Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .models import models_pb2 as models
from .utils import ConnectionManager

# Initialize the fastAPI application.
app = FastAPI()
app.mount("/static", StaticFiles(directory="server/static"), name="static")

templates = Jinja2Templates(directory="server/templates")

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

def init_manager():
  return ConnectionManager()


# Create the root server for the application. This maps 
# UUIDs -> Rooms, which allow us to handle our room management
# across all the tracks being created and updated.
server = init_server()
manager = init_manager()

@app.get("/")
def serve_frontend(request: Request):
  return templates.TemplateResponse("index.html", {
    "request": request
  })


@app.get("/api/hello")
def hello_world():
  return "world"


@app.websocket("/api/ws/{clientId}")
async def websocket_endpoint(websocket: WebSocket, clientId: str):
  await manager.connect(websocket)
  while True:
    try:
      # Wait for any message from the client.
      data = await websocket.receive_text()
      
      # Send message to the client.
      await manager.send_message("resp", websocket)
    except WebSocketDisconnect:
      manager.disconnect(websocket)

def start():
  """Launched with `poetry run start` at root level"""
  uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)