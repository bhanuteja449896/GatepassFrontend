import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await fetch(
            `https://gatepassfirestore.onrender.com/hod/login/${username}/${password}`, 
           //{mode : "no-cors"}
          );
          

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.rc === "00") {
        // Successful login, navigate to HOD Dashboard
        navigate("/hod-dashboard", {
          state: {
            username: result.username,
            name: result.name,
            gmail: result.gmail,
            mobile: result.mobile,
          },
        });
      } else {
        // Handle error based on the response
        setErrorMessage(result.desc);
      }
    } catch (error) {
      console.error("Error connecting to the API:", error);
      setErrorMessage("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div>
      <h2>HOD Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
