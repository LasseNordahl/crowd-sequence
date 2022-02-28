import { useState, useEffect, useRef } from 'react';

import { useSocket } from "../../hooks";

interface RoomProps {
  username: string,
  roomId: string
}

interface Transaction {
  action: string;
  payload?: any;
}

interface RoomSettings {
  numMeasures: number,
  numSubdivisions: number,
  isOwnder: boolean,
  users: string[]
}

const RoomComponent = (props: RoomProps) => {
  const [instrument, setInstrument] = useState('');
  const [isPaused, setPause] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [users, setUsers] = useState<string[]>([]);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:8000/api/ws/room/${props.roomId}/user/${props.username}`);
    socket.current.onopen = (event: any) => {
      console.log("Was able to open the websocket");
      console.log(event);
    };
    

    const wsCurrent = socket.current;
    return () => {
      wsCurrent.close();
    };
  }, [])

  useEffect(() => {
    if (!socket.current) 
      return;

    socket.current.onmessage = (event: any) => {
      console.log("webSocket message received:", JSON.parse(event.data));
      const data: Transaction = JSON.parse(event.data);
      
      switch (data.action) {
        case 'room settings':
          if(data.payload) {
            setSettings(data.payload);
            setUsers(data.payload['users'])
          }
          break;
        case 'room join':
          if(data.payload) {
            setUsers(users => [...users, data.payload['name']])
          }
          break;
      }
    };
  }, [isPaused])

  const handleUpdate = (data: Transaction) => {
    console.log(data)
    switch (data.action) {
      case 'room settings':
        if(data.payload) {
          setSettings(data.payload);
          setUsers(data.payload['users'])
        }
        break;
      case 'room join':
        console.log(data.payload);

        if(data.payload) {
          console.log('through if')
          let usersCopy = [...users];
          usersCopy.push(data.payload['name']);
          setUsers(usersCopy)
        }
        break;
    }
  }

  //const { sendTransaction, readyState } = useRef(useSocket({onUpdate: handleUpdate, params: {'roomId': props.roomId, 'username': props.username}}));  

  return (
    <div>
      {users.map((user: string) => 
         <p key={user}>{user}</p>
      )}
      <p>{settings?.numMeasures}</p>
      <p>{settings?.numSubdivisions}</p>
      <p>{props.roomId}</p>
    </div>
  )
}

export default RoomComponent;