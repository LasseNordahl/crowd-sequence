import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Room, TestSpace } from "./views";
import { useSocket } from "./hooks";

const App = () => {
  const { socketData } = useSocket({});

  console.log(socketData);

  return (
    <div className="w-screen h-screen flex flex-row">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:roomId" element={<Room/>}/>
          <Route path="/test" element={<TestSpace/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
