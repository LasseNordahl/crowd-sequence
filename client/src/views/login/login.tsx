import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nickname, setNickname] = useState("null");
  const navigate = useNavigate();


  const submitNickname = () => {
    // Submit the nickname, get the room pages. For
    // now we can go to the 
    navigate("/room/lassesroom")
  }

  return (
    <div className="form-control w-full flex items-center justify-center">
      <input
        type="text"
        placeholder="Enter Nickame"
        className="input focus:outline-none border-none"
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <button className="btn m-4" onClick={() => submitNickname()}>
        Submit
      </button>
    </div>
  );
};

export default Login;
