import { useState, useEffect, useRef } from 'react';

import { useSocket } from "../../hooks";

import { NoteChange } from '../../models/proto/models_pb';

import { useRoomContext } from "../../context/roomContext";

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

const RenderedNote = (noteVal: number, index: number) => {
  return (
    <div key={index}
      className={`${
        (noteVal > 0) ? "bg-orange-400" : "bg-orange-100"
      } m-1 rounded-md w-8 h-8 cursor-pointer`}
    ></div>
  );
}

const RoomComponent = (props: RoomProps) => {
  const [instrument, setInstrument] = useState('');
  const [measures, setMeasures] = useState(0);
  const [subdivisions, setSubdivisions] = useState(0);
  const [settings, setSettings] = useState<any | RoomSettings>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [tracks, setTracks] = useState(new Map()); 

  const state = useRoomContext();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
      {Object.keys(state.users).map((user: string) => 
        <div key={user}>
          <p>{user}</p>
          <div className="flex flex-row">
            {state.users[user].track.map((notes: number[]) => 
              <div className="flex flex-col">
                {notes.map((note, idx) => {return RenderedNote(note, idx)})}
              </div>
            )}
          </div>
         </div>
      )}
      </div>
      <p>{state.numMeasures}</p>
      <p>{state.numSubdivisions}</p>
      <p>{props.roomId}</p>
    </div>
  )
}

export default RoomComponent;