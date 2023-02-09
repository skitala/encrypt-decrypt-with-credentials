import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authorization from "./components/Authorization";
import React, { useState } from "react";
import RecieverAuthorization from "./components/RecieverAuthorization";
import { Context } from "./context/Context";

function App() {
  const [validated, setSuccessfulValidation] = useState(false);

  return (
    <Router>
      <Context.Provider value={{ validated, setSuccessfulValidation }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/validation" element={<RecieverAuthorization />} />
        </Routes>
      </Context.Provider>
    </Router>
  );
}

export default App;
