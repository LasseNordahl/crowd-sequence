import { useEffect } from "react"
import { useParams } from "react-router-dom";

import { useSocket } from "../../hooks";
import { Bar, Note } from "../../models/proto/models_pb";

import { Panel } from "./panel";
import { Tracks } from "./tracks";

const Room = () => {
  const { roomId, username } = useParams();
  const { sendTransaction, readyState } = useSocket({params: {'roomId': roomId, 'username': username}});

  

  const testTransaction = async() => {
    if (readyState === 1) {
      console.log("Ready state", readyState);
      const test = new Bar();
      test.setHeight(1234);
      const notes = new Note();
      notes.setActive(true)
      test.addNotes(notes)
      const buffer = test.serializeBinary()

      console.log(test, test.serializeBinary());

      sendTransaction("hello world", buffer.toString());
    }
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <p onClick={testTransaction} >Click Me</p>
      <div className="h-screen flex-1 flex items-center justify-center">
        <Tracks />
      </div>
      <div className="min-w-128 h-screen color-white p-16">
        <Panel />
      </div>
    </div>
  );
};

export default Room;
