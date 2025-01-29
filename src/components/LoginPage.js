import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default to 'admin'
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    let apiUrl = "";
    switch (role) {
      case "admin":
        apiUrl = `https://gatepassfirestore.onrender.com/admin/login/${username}/${password}`;
        break;
      case "hodoffice":
        apiUrl = `https://gatepassfirestore.onrender.com/hodoffice/login/${username}/${password}`;
        break;
      case "hod":
        apiUrl = `https://gatepassfirestore.onrender.com/hod/login/${username}/${password}`;
        break;
      case "security":
        apiUrl = `https://gatepassfirestore.onrender.com/security/login/${username}/${password}`;
        break;
      default:
        setErrorMessage("Invalid role selected.");
        return;
    }

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.rc === "00") {
        // Navigate to the respective dashboard
        switch (role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "hodoffice":
            navigate("/front-office-dashboard");
            break;
          case "hod":
            navigate("/hod-dashboard");
            break;
          case "security":
            navigate("/security-dashboard");
            break;
          default:
            break;
        }
      } else {
        setErrorMessage(result.desc);
      }
    } catch (error) {
      console.error("Error connecting to the API:", error);
      setErrorMessage("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="login-select"
            >
              <option value="admin">Admin</option>
              <option value="hodoffice">Front Office</option>
              <option value="hod">HOD</option>
              <option value="security">Security</option>
            </select>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
