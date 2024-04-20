import './App.css';
import React, { useState, useEffect } from 'react';
import Layout from './Layout/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Auth/Login';
import Signup from './Auth/Signup';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={loggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </Router>
  );
}

export default App;
