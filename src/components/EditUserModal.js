import React, { useState } from "react";
import "./EditUserModal.css";

const EditUserModal = ({ user, type, onClose, onUserUpdated, onDelete }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl;

    // Determine the API URL based on user type
    switch (type) {
      case "hods":
        apiUrl = `https://dummyapi.com/hods/update/${user.id}`;
        break;
      case "frontOffice":
        apiUrl = `https://dummyapi.com/frontOffice/update/${user.id}`;
        break;
      case "security":
        apiUrl = `https://dummyapi.com/security/update/${user.id}`;
        break;
      default:
        return;
    }

    // Send update request to the backend
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const updatedUser = await response.json();
    onUserUpdated(updatedUser);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit {type.slice(0, -1)}</h2>
        <form onSubmit={handleSubmit}>
          {type === "hods" && (
            <>
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                name="gmail"
                placeholder="Gmail"
                value={formData.gmail}
                onChange={handleInputChange}
              />
              <input
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </>
          )}
          {type === "frontOffice" && (
            <>
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                name="dept"
                placeholder="Department"
                value={formData.dept}
                onChange={handleInputChange}
              />
            </>
          )}
          {type === "security" && (
            <>
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                name="securityNumber"
                placeholder="Security Number"
                value={formData.securityNumber}
                onChange={handleInputChange}
              />
            </>
          )}
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
        <button className="delete-btn" onClick={onDelete}>
          Delete User
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
