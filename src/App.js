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
  
  

  return (
    <div className="App">
      <div className="login-card">
        <h2>Login</h2>
        <div className="login-input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
