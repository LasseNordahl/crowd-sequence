import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Room } from "./views";
import { useSocket } from "./hooks";
import { Bar, Note } from "./models/proto/models_pb";

const App = () => {
  const { sendTransaction, readyState } = useSocket({});

  useEffect(() => {
    if (readyState === 1) {
      console.log("Ready state", 1);
      const test = new Bar();
      test.setHeight(1234)
      const notes = new Note();
      notes.setActive(true)
      test.addNotes(notes)
      const buffer = test.serializeBinary()

      console.log(test, test.serializeBinary());

      sendTransaction("hello world", buffer.toString());
    }
  }, [sendTransaction, readyState]);

  return (
    <div className="w-screen h-screen flex flex-row">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
