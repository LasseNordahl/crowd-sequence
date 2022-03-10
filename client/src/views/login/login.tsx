import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateRoom } from "../../models/proto/models_pb";
import RoomComponent from '../room2/room';
import { useRoomContext } from "../../context/roomContext";

enum loginChoice {
  none = 0,
  join = 1,
  create = 2,
  complete = 3
}



const Login = () => {
  const [nickname, setNickname] = useState("null");
  const [roomId, setRoomId] = useState("null");
  const [loginState, setLoginState] = useState<loginChoice>(loginChoice.none);
  const [numMeasures, setNumMeasures] = useState(0);
  const [subdivision, setSubdivision] = useState(0);

  const { join } = useRoomContext();

  const navigate = useNavigate();

  const fetchAPI = () => {
    const roomVals = new CreateRoom();
    roomVals.setMeasures(numMeasures);
    roomVals.setSubdivisions(subdivision);
    console.log(roomVals.serializeBinary().toString());

    return fetch('http://0.0.0.0:8000/api/generateRoomId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomVals.serializeBinary().toString())
    }).then(response => {
        if(!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json().then(jsonResponse => {
          return jsonResponse;
        })
      })
  }

  const submitNickname = async() => {
    if (roomId === "null") {
      // gets unique room id from server
      let generatedRoomId = await fetchAPI();
      setRoomId(generatedRoomId);
      join(generatedRoomId, nickname);
      setLoginState(loginChoice.complete);

      // Submit the nickname, get the room pages. For
      // now we can go to the 
      // navigate(`/room/${generatedRoomId}/user/${nickname}`)
    } else {
      //navigate(`/room/${roomId}/user/${nickname}`)
      join(roomId, nickname);
      setLoginState(loginChoice.complete);
    }
  }

  return (
    <div className="form-control w-full flex items-center justify-center">

      { 
        (loginState === loginChoice.none) && 
          <Fragment>
          <input
            type="text"
            placeholder="Enter Nickame"
            className="input focus:outline-none border-none"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <button className="btn m-4" onClick={() => setLoginState(loginChoice.join)}>
            Join Room
          </button>
          <button className="btn m-4" onClick={() => setLoginState(loginChoice.create)}>
            Create Room
          </button>
          </Fragment>
      }

      { 
        (loginState === loginChoice.join) &&
        <Fragment>
          <input
          type="text"
          placeholder="Enter Room ID"
          className="input focus:outline-none border-none"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          />
          <button className="btn m-4" onClick={submitNickname}>
            Join
          </button>
          </Fragment>
      }

      {
        (loginState === loginChoice.create) &&
          <Fragment>
            <input 
              type="number" placeholder="Measures" className="input focus:outline-none border-none" 
              onChange={(e) => { setNumMeasures(parseInt(e.target.value)); }}
            />
            <select className="select select-bordered" 
            onChange={(e) => { setSubdivision(parseInt(e.target.value)) }}
            >
              <option disabled selected>Pick An Option</option>
              <option value={4}>1/4 Note</option>
              <option value={8}>1/8 Note</option>
              <option value={16}>1/16 Note</option>
            </select>
            <button className="btn m-4" onClick={submitNickname}>
              Create
            </button>
          </Fragment>
      }
      {
        (loginState === loginChoice.complete) && 
        < RoomComponent username={nickname} roomId={roomId} />
      }
    </div>
  );
};

export default Login;
