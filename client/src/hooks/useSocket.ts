import { useState, useEffect } from "react";

interface useSocketProps {
  onOpen?: () => void;
  onUpdate?: () => void;
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
const useSocket = ({ onOpen, onUpdate }: useSocketProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // readyState defines the state that the socket connection
  const [readyState, setReadyState] = useState<number | null>(null);

  // Send transaction sends data over the socket connection, action
  // defines what type of action we want to send, and payload contains
  // possible type data of an object we want to update.
  const sendTransaction = (action: string, payload?: string) => {
    // If the socket is availablem, we can execute a transaction
    // over the socket to the backend.
    if (socket && socket.readyState === 1) {
      let transaction: Transaction = {
        action: action,
        payload: payload,
      };
      socket.send(JSON.stringify(transaction));
    } else {
      console.error("socket is not available");
    }
  };

  // Monitor the ready state of the socket connection, incase we want to
  // display an error on the frontend.
  useEffect(() => {
    if (socket && readyState !== socket.readyState) {
      setReadyState(socket.readyState);
    }
  }, [socket, readyState]);

  // On initialization of the hook, we can create a socket connection,
  // and define the different behaviors for it as we go.
  useEffect(() => {
    console.log("initializing socket");

    let newSocket = new WebSocket(
      `ws://localhost:8000/api/ws/room/001/user/lasse`
    );

    // Initialize onOpen function if we are given one.
    if (onOpen) {
      newSocket.onopen = onOpen;
    }

    newSocket.onopen = (event: any) => {
      console.log("Was able to open the websocket");
      if (onOpen) {
        onOpen();
      }
    };

    newSocket.onmessage = (event: any) => {
      console.log("webSocket message received:", event);
      if (onUpdate) {
        onUpdate();
      }
    };

    newSocket.onerror = (event: any) => {
      console.error("error with websocket: ", event);
    };

    setSocket(newSocket);
  }, [onUpdate, onOpen]);

  return { sendTransaction, readyState };
};

export default useSocket;
