import React, { useState } from "react";
import "./AddUserModal.css";

const AddUserModal = ({ type, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl;
    switch (type) {
      case "hods":
        apiUrl = "https://gatepassfirestore.onrender.com/hod/add";
        break;
      case "frontOffice":
        apiUrl = "https://gatepassfirestore.onrender.com/hodoffice/add";
        break;
      case "security":
        apiUrl = "https://gatepassfirestore.onrender.com/security/add";
        break;
      default:
        return;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newUser = await response.json();
    onUserAdded(newUser);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add {type}</h2>
        <form onSubmit={handleSubmit}>
          {type === "hods" && (
            <>
              <input name="username" placeholder="Username" onChange={handleInputChange} />
              <input name="password" placeholder="Password" onChange={handleInputChange} />
              <input name="name" placeholder="Name" onChange={handleInputChange} />
              <input name="gmail" placeholder="Gmail" onChange={handleInputChange} />
              <input name="mobile" placeholder="Mobile" onChange={handleInputChange} />
            </>
          )}
          {type === "frontOffice" && (
            <>
              <input name="username" placeholder="Username" onChange={handleInputChange} />
              <input name="password" placeholder="Password" onChange={handleInputChange} />
              <input name="dept" placeholder="Department" onChange={handleInputChange} />
            </>
          )}
          {type === "security" && (
            <>
              <input name="username" placeholder="Username" onChange={handleInputChange} />
              <input name="password" placeholder="Password" onChange={handleInputChange} />
              <input name="name" placeholder="Name" onChange={handleInputChange} />
              <input name="securityNumber" placeholder="Security Number" onChange={handleInputChange} />
            </>
          )}
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddUserModal;
