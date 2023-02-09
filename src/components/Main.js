import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Main = () => {
  const [input, setInput] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [clicked, isClicked] = useState(false);
  const encryptedResult = useRef("");
  const decryptedResult = useRef("");
  const navigate = useNavigate();
  const enableInput = useRef("");
  const { validated, setSuccessfulValidation } = useContext(Context);

  useEffect(() => {
    isClicked(true);
    navigate("/login");
    if (localStorage.length > 0) {
      isClicked(false);
      navigate("/");
      enableInput.current.disabled = false;
    }
  }, [clicked]);

  let cryptoMsg = "";
  const encrypt = () => {
    [...input].map((letter) => {
      const codes = [];
      codes.push(letter.charCodeAt() - 7);
      codes.map((letter) => {
        cryptoMsg += String.fromCharCode(letter);
      });
      return cryptoMsg;
    });
    if (localStorage.length < 1) {
      navigate("/login");
    }
    setSuccessfulValidation(false);
    setEncrypted(cryptoMsg);
    localStorage.setItem("encryptedMsg", cryptoMsg);
    encryptedResult.current.innerText = cryptoMsg;
  };

  let decryptedMsg = "";
  const decrypt = () => {
    const encryptedMsg = localStorage.getItem("encryptedMsg");
    if (validated) {
      // [...encrypted].map((letter) => {
      [...encryptedMsg].map((letter) => {
        let decryptedCodes = letter.charCodeAt() + 7;
        decryptedMsg += String.fromCharCode(decryptedCodes);
        return decryptedMsg;
      });
      setDecrypted(decryptedMsg);
      setSuccessfulValidation(true);
      decryptedResult.current.innerText = decryptedMsg;
      console.log(validated);
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("encryptedMsg");
    } else {
      navigate("/validation");
    }
  };

  // const validation = () => {
  //   navigate("/validation");
  // };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="encryptionContainer">
          <div className="agentIcon"></div>
          <input
            type="text"
            className="encryptInput"
            onChange={onChange}
            disabled
            ref={enableInput}
          />
          {/* <button className="login" onClick={clicked ? navigate("/login") : ""}>
            Log In
          </button> */}
          <button
            className="submitEncryptBtn"
            onClick={() => {
              encrypt();
            }}
          >
            Encrypt Message
          </button>
          <div className="encryptedResult" ref={encryptedResult}></div>
        </div>
        <div className="decryptionContainer">
          <div className="agentIconDecrypt"></div>
          <input type="text" className="decryptInput" />
          <button
            className="submitDecryptBtn"
            onClick={() => {
              // validation();
              decrypt();
            }}
          >
            Decrypt Message
          </button>
          <div className="decryptedResult" ref={decryptedResult}></div>
        </div>
      </div>
    </>
  );
};

export default Main;
