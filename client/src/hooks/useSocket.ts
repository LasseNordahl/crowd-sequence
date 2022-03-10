import { Socket } from "dgram";
import { useState, useEffect, useRef, useCallback } from "react";
import { Room } from '../models/proto/models_pb';
interface useSocketProps {
  onOpen?: (ev: Event) => any;
  onMessage?: (ev: MessageEvent<any>) => any;
  params: any;// object with key for url and value for each
}

// Transaction defines the socket transaction that we want to execute
// on the backend.
interface Transaction {
  action: string;
  payload?: string;
}

export interface Contextable {
  context: string;
}

export type ConnectFN = (
  gameCode: string,
  name: string | null,
  playerId?: string
) => void;

export type SessionHook = [
  ConnectFN,
  (action: string, payload?: string) => void,
  () => void
];

// callback for onOpen function type
export const useConnectionCallback = () => {
  const callback = useCallback(() => {}, []);
  return callback;
};

// callback for onMessage functions
export const useMessageCallback = (dispatch: React.Dispatch<any>) => {
  const callback = useCallback(
    (ev: MessageEvent<any>) => {
      const data: Transaction = JSON.parse(ev.data);
      console.log(data);
      if (data.action) dispatch({ action: data.action, payload: data.payload });
    },
    [dispatch]
  );
  return callback;
};

// useSocket allows us to nicely establish a socket connection
// to the backend, making it a bit easier for us to navigate
// state changes that could potentially occur on the server.
export function useSocket ( onOpen: useSocketProps["onOpen"] , onMessage: useSocketProps["onMessage"]): SessionHook {
  const [socket, setSocket] = useState(null as unknown as WebSocket);

  // Connection Open update handler
  useEffect(() => {
    if (!socket || !onOpen) return;
    
    socket.addEventListener('open', onOpen);

    return () => {
      socket.removeEventListener('open', onOpen);
    }
  }, [socket, onOpen])

  // Message Received update handler
  useEffect(() => {
    if (!socket || !onMessage) return;

    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
    }
  }, [socket, onMessage])

  const connect = useCallback(
    (roomId: string, name: string | null, playerId?: string) => {
      const url = `ws://localhost:8000/api/ws/room/${roomId}/user/${name}`;
      console.log('Initializing websocket connection at ', url);
      const ws = new WebSocket(url);
      setSocket(ws);
    }, []
  );

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

  const close = useCallback(() => {
    if (socket.readyState === socket.OPEN) 
      socket.close(1001);
  }, [socket]);

  // // Monitor the ready state of the socket connection, incase we want to
  // // display an error on the frontend.
  // useEffect(() => {
  //   if (sock.current && readyState !== sock.current.readyState) {
  //     console.log('ready state change')
  //     setReadyState(sock.current.readyState);
  //   }
  // }, [sock, readyState]);

  // // On initialization of the hook, we can create a socket connection,
  // // and define the different behaviors for it as we go.
  // useEffect(() => {
  //   console.log("initializing socket at ", `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`);

  //   // let newSocket = new WebSocket(
  //   //   `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`
  //   // );
  //   sock.current = new WebSocket(
  //     `ws://localhost:8000/api/ws/room/${params['roomId']}/user/${params['username']}`
  //   );

  //   // Initialize onOpen function if we are given one.
  //   if (onOpen) {
  //     sock.current.onopen = onOpen;
  //   }

  //   sock.current.onopen = (event: any) => {
  //     console.log("Was able to open the websocket");
  //     //setReadyState(newSocket.readyState);
  //     if (onOpen) {
  //       onOpen();
  //     }
  //   };

  //   sock.current.onmessage = (event: any) => {
  //     console.log("webSocket message received:", JSON.parse(event.data));
  //     const data: Transaction = JSON.parse(event.data);
  //     if(data.action === 'room settings') {
  //       console.log(data.payload)
  //     }
  //     if (onUpdate) {
  //       onUpdate(data);
  //     }
  //   };

  //   sock.current.onerror = (event: any) => {
  //     console.error("error with websocket: ", event);
  //   };

  //   const wsCurrent = sock.current;

  //   return () => {
  //     wsCurrent.close();
  //   };

  //   //setSocket(newSocket);
  // }, []);

  return [connect, sendTransaction, close];
};
