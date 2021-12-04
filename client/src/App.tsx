import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./views";

const App = () => {
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
