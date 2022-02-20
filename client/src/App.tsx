import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Room, TestSpace } from "./views";



const App = () => {
  

  // useEffect(() => {
  //   console.log("Ready State Before", readyState);
  //   if (readyState === 1) {
  //     console.log("Ready state", 1);
  //     const test = new Bar();
  //     test.setHeight(1234);
  //     const notes = new Note();
  //     notes.setActive(true)
  //     test.addNotes(notes)
  //     const buffer = test.serializeBinary()

  //     console.log(test, test.serializeBinary());

  //     sendTransaction("hello world", buffer.toString());
  //   }
  // }, [readyState]);

  return (
    <div className="w-screen h-screen flex flex-row">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:roomId/user/:username" element={<Room/>}/>
          <Route path="/test" element={<TestSpace/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
