import uuid 

from .models import models_pb2 as models
from .utils import ConnectionManager

# Init.py is the main source of all our init functions for setting up the variables
# we'll use across the application. Here we can declare most of those.

def init_room():
  random_id = uuid.uuid4()
  room = models.Room()
  room.id = random_id
  room.tracks = 3
  room.speed = 1
  room.name

def init_server():
  s = models.Server()
  s.capacity = 4
  return s

def init_manager():
  return ConnectionManager()