import { useState, useEffect } from "react";

interface useSocketProps {
  onOpen?: () => void;
}

const useSocket = ({ onOpen }: useSocketProps) => {
  const [socket, setSocket] = useState(null);
  const [socketData, setSocketData] = useState(null);
  const [readyState, setReadyState] = useState(null);

  useEffect(() => {
    console.log("initializing socket");

    let newSocket = new WebSocket("ws://localhost:8000/api/ws/123");

    // Initialize onOpen function if we are given one.
    if (onOpen) {
      newSocket.onopen = onOpen;
    }

    newSocket.onopen = (event: any) => {
      newSocket.send(new Blob(["hello", "world"]));

      // Call a given onOpen function if it is defined in the hook.
      if (onOpen) {
        onOpen();
      }
    };

    newSocket.onmessage = (event: any) => {
      console.log("webSocket message received:", event);
    };

    newSocket.onerror = (event: any) => {
      console.error("error with websocket: ", event);
    };
  }, []);

  return { socketData };
};

export default useSocket;
