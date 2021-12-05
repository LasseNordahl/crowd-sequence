import { useState, useEffect } from "react";

interface useSocketProps {
  onOpen?: () => void
}

const useSocket = ({
  onOpen
}: useSocketProps) => {
  var socket: any = null;

  const [socketData, setSocketData] = useState(null);

  useEffect(() => {
    console.log("initializing socket")
    socket = new WebSocket("ws://localhost:8000/ws/123");
    socket.onopen = onOpen;
    socket.onmessage = (event: any) => {
      console.log("WebSocket message received:", event);
    };
  }, []);

  return { socketData };
};

export default useSocket;
