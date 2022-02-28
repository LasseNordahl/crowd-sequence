import { useState, useEffect, useRef } from "react";
import { Room } from '../models/proto/models_pb';
interface useSocketProps {
  onOpen?: () => void;
  onUpdate?: (data: Transaction) => void;
  params: any;// object with key for url and value for each
}

// Transaction defines the socket transaction that we want to execute
// on the backend.
interface Transaction {
  action: string;
  payload?: string;
}

// useSocket allows us to nicely establish a socket connection
// to the backend, making it a bit easier for us to navigate
// state changes that could potentially occur on the server.
const useSocket = ({ onOpen, onUpdate, params }: useSocketProps) => {
  const sock = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // readyState defines the state that the socket connection
  const [readyState, setReadyState] = useState<number | null>(null);

  // Send transaction sends data over the socket connection, action
  // defines what type of action we want to send, and payload contains
  // possible type data of an object we want to update.
  const sendTransaction = (action: string, payload?: string) => {
    // If the socket is availablem, we can execute a transaction
    // over the socket to the backend.
    if (sock.current && sock.current.readyState === 1) {
      let transaction: Transaction = {
        action: action,
        payload: payload,
      };
      sock.current.send(JSON.stringify(transaction));
    } else {
      console.error("socket is not available");
    }
  };

  // Monitor the ready state of the socket connection, incase we want to
  // display an error on the frontend.
  useEffect(() => {
    if (sock.current && readyState !== sock.current.readyState) {
      console.log('ready state change')
      setReadyState(sock.current.readyState);
    }
  }, [sock, readyState]);

  // On initialization of the hook, we can create a socket connection,
  // and define the different behaviors for it as we go.
  useEffect(() => {
    console.log("initializing socket at ", `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`);

    // let newSocket = new WebSocket(
    //   `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`
    // );
    sock.current = new WebSocket(
      `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`
    );

    // Initialize onOpen function if we are given one.
    if (onOpen) {
      sock.current.onopen = onOpen;
    }

    sock.current.onopen = (event: any) => {
      console.log("Was able to open the websocket");
      //setReadyState(newSocket.readyState);
      if (onOpen) {
        onOpen();
      }
    };

    sock.current.onmessage = (event: any) => {
      console.log("webSocket message received:", JSON.parse(event.data));
      const data: Transaction = JSON.parse(event.data);
      if(data.action === 'room settings') {
        console.log(data.payload)
      }
      if (onUpdate) {
        onUpdate(data);
      }
    };

    sock.current.onerror = (event: any) => {
      console.error("error with websocket: ", event);
    };

    const wsCurrent = sock.current;

    return () => {
      wsCurrent.close();
    };

    //setSocket(newSocket);
  }, []);

  return { sendTransaction, readyState };
};

export default useSocket;
