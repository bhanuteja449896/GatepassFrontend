import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import HODDashboard from "./components/HODDashboard";
import FrontOfficeDashboard from "./components/FrontOfficeDashboard";
import SecurityDashboard from "./components/SecurityDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/front-office-dashboard" element={<FrontOfficeDashboard />} />
        <Route path="/security-dashboard" element={<SecurityDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
