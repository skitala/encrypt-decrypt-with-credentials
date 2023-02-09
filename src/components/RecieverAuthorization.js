import { useState, useEffect, useRef, React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const RecieverAuthorization = () => {
  const [message, setMessage] = useState(
    "Agent, enter sender credentials please."
  );
  const [writeMsg, setWriteMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [validated, setSuccessfulValidation] = useState(false);

  const navigate = useNavigate();

  const { validated, setSuccessfulValidation } = useContext(Context);

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

  const validateCredentials = () => {
    if (
      localStorage.getItem("username") === username &&
      localStorage.getItem("password") === password
    ) {
      setSuccessfulValidation(true);
      console.log(validated, setSuccessfulValidation);

      navigate("/");
    }
  };

  return (
    // <Context.Provider value={successfulValidation}>
    <div className="credentials">
      <h1 className="message">{writeMsg}</h1>
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
      <button className="login" onClick={validateCredentials}>
        Log In
      </button>
    </div>
    // </Context.Provider>
  );
};

export default RecieverAuthorization;
