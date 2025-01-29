import React, { useState, useEffect } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState({
    hods: [],
    frontOffice: [],
    security: [],
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const hods = await fetch("https://dummyapi.com/hods").then((res) => res.json());
      const frontOffice = await fetch("https://dummyapi.com/frontOffice").then((res) =>
        res.json()
      );
      const security = await fetch("https://dummyapi.com/security").then((res) => res.json());
      setUsers({ hods, frontOffice, security });
    };
    fetchUsers();
  }, []);

  const handleAddUser = (type) => {
    setUserType(type);
    setAddModalOpen(true);
  };

  const handleEditUser = (user, type) => {
    setSelectedUser(user);
    setUserType(type);
    setEditModalOpen(true);
  };

  const handleDeleteUser = async (userId, type) => {
    await fetch(`https://dummyapi.com/${type}/delete/${userId}`, { method: "DELETE" });
    setUsers((prev) => ({
      ...prev,
      [type]: prev[type].filter((user) => user.id !== userId),
    }));
    alert("User deleted successfully!");
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Dropdown Menus */}
      {["hods", "frontOffice", "security"].map((type) => (
        <div key={type} className="user-section">
          <h2 className="section-title">{type.toUpperCase()}</h2>
          <div className="dropdown">
            {users[type].map((user) => (
              <div
                key={user.id}
                className="user-item"
                onClick={() => handleEditUser(user, type)}
              >
                {user.name || user.username}
              </div>
            ))}
            <button
              className="add-user-btn"
              onClick={() => handleAddUser(type)}
            >
              + Add New
            </button>
          </div>
        </div>
      ))}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <AddUserModal
          type={userType}
          onClose={() => setAddModalOpen(false)}
          onUserAdded={(newUser) =>
            setUsers((prev) => ({
              ...prev,
              [userType]: [...prev[userType], newUser],
            }))
          }
        />
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          type={userType}
          onClose={() => setEditModalOpen(false)}
          onUserUpdated={(updatedUser) =>
            setUsers((prev) => ({
              ...prev,
              [userType]: prev[userType].map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              ),
            }))
          }
          onDelete={() => handleDeleteUser(selectedUser.id, userType)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
