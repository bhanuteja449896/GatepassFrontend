<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HODDashboard from "./components/HODDashboard";
=======
import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const apiUrl = `https://gatepassfirestore.onrender.com/hod/login/${username}/${password}`;
    try {
      const response = await fetch(apiUrl);
  
      // Log the response for debugging
      console.log('Raw Response:', response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
  
      // Log the parsed data
      console.log('Parsed Data:', data);
  
      if (data.rc === '00') {
        setMessage('✅ Login Successful');
      } else {
        setMessage('❌ Login Failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('❌ Error during login. Please try again.');
    }
  };
  
  
>>>>>>> 46fda6784c16a2396de66a79ed84bfa26883118c

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
