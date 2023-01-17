import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
