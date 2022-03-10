import { useEffect, useCallback, createContext, useContext, useReducer } from "react";
import { roomReducer, initialRoomState, RoomData } from "../hooks/roomReducer";
import { useSocket, useConnectionCallback, useMessageCallback } from "../hooks";

export interface IRoomContext extends RoomData {
  join(gameCode: string, name: string): void;
  close(): void;
}

// creates empty context for provider later
export const RoomContext = createContext<IRoomContext>( {} as IRoomContext );

export const useRoomContext = () => {
  return useContext(RoomContext);
}

type Reducer = ( state: RoomData, action: any ) => RoomData;
interface Wrapper {children: string | JSX.Element | JSX.Element[] | Element | Element[]}
// Context Provider Wrapper Component
export default function RoomContextProvider({children}: Wrapper) {
  const [state, dispatch] = useReducer(roomReducer as Reducer, initialRoomState);
  const onOpen = useConnectionCallback();
  const onMessage = useMessageCallback(dispatch);
  const [connect, sendTransaction, closeConn] = useSocket(onOpen, onMessage);

  const join = (gameCode: string, name: string) => connect(gameCode, name);

  const close = () => {
    dispatch({ type: 'GOING_AWAY' });
    closeConn();
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        join,
        close
      }}
    >
      { children }
    </RoomContext.Provider>
  )
}