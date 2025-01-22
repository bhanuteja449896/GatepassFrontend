import React from "react";
import { useLocation } from "react-router-dom";

const HODDashboard = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <p>Error: No user data found. Please log in again.</p>;
  }

  const { username, name, gmail, mobile } = state;

  return (
    <div>
      <h2>Welcome to HOD Dashboard</h2>
      <div>
        <h3>HOD Details:</h3>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Gmail:</strong> {gmail}
        </p>
        <p>
          <strong>Mobile:</strong> {mobile}
        </p>
      </div>
    </div>
  );
};

export default HODDashboard;
