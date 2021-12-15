import uvicorn
import uuid 
import json

from typing import Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .models import models_pb2 as models
from .utils import ConnectionManager
from .init import init_server, init_manager

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

# to_binary_string allows us to decode the serialized data we get from
# our frontend typescript code.
def to_binary_string(x): 
  x = x.decode('utf-8').split(',') 
  return bytes(list(map(lambda i: int(i), x)))


# handle_transaction allows us to organize actions we want to take
# from the websocket.
def handle_transaction(roomId: str, clientId: str, action: str, payload: str):

  # First we convert the payload.
  converted_payload = to_binary_string(payload.encode("utf-8"))

  # Example of a bar encoded payload.
  newbar = models.Bar()
  newbar.ParseFromString(converted_payload)

  print(newbar)

  pass


@app.websocket("/api/ws/room/{roomId}/user/{clientId}")
async def websocket_endpoint(websocket: WebSocket, roomId: str, clientId: str):
  await manager.connect(websocket)
  print("was able to connect to the websocket")
  while True:
    try:
      # Wait for any message from the client.
      data = await websocket.receive_text()

      print("Websocket end recieved data", data)

      transaction = json.loads(data)
      handle_transaction(roomId, clientId, transaction["action"], transaction["payload"])
      
      # Send message to the client.
      await manager.send_message("response", websocket)
    except WebSocketDisconnect:
      manager.disconnect(websocket)

def start():
  """Launched with `poetry run start` at root level"""
  uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)