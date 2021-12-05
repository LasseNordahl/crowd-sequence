import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./views";
import { useSocket } from "./hooks";

const App = () => {
  const { socketData } = useSocket({});

  return (
    <div className="h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
