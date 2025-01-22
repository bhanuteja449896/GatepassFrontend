import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HODDashboard from "./components/HODDashboard";

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
