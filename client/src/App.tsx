import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Room, TestSpace } from "./views";
import RoomContextProvider from "./context/roomContext";


const App = () => {

  return (
    <div className="w-screen h-screen flex flex-row">
    <RoomContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:roomId/user/:username" element={<Room/>}/>
          <Route path="/test" element={<TestSpace/>}/>
        </Routes>
      </Router>
    </RoomContextProvider>
    </div>
  );
};

export default App;
