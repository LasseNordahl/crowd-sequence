import { useState, useEffect } from "react";

const Login = () => {
  const [nickname, setNickname] = useState("null");

  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Enter Nickame"
          className="input focus:outline-none border-none"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button className="btn m-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
