import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const [message, setMessage] = useState(
    "Agent, enter your credentials please."
  );
  const [writeMsg, setWriteMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const agentMessage = useRef("");

  const saveCredentials = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate("/");
  };

  let index = 0;
  let speed = 200;
  function writeText(text) {
    text = message.slice(0, index);
    index++;
    // agentMessage.current.innerText = text;
    setWriteMsg((prevState) => (prevState, text));

    if (index === text.length) {
      return text;
    }

    setTimeout(writeText, speed);
  }

  useEffect(() => {
    writeText(message);
  }, []);

  return (
    <div className="credentials">
      <h1 className="message" ref={agentMessage}>
        {writeMsg}
      </h1>
      <h3>Username:</h3>
      <input
        type="text"
        className="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <h3>Password:</h3>
      <input
        type="password"
        className="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login" onClick={saveCredentials}>
        Log In
      </button>
    </div>
  );
};

export default Authorization;
