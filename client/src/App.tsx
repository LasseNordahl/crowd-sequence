import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Room } from "./views";
import { useSocket } from "./hooks";

const App = () => {
  const { socketData } = useSocket({});

  return (
    <div className="h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:roomId" element={<Room/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
