import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    account: "",
    name: "",
    password: "",
    phone: "",
    email: "",
    type: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://62b47263530b26da4cbebae9.mockapi.io/users"
      );
      // success
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://62b47263530b26da4cbebae9.mockapi.io/users/${userId}`
      );

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary">User Management</h1>

      <div className="card">
        <div className="card-header bg-dark text-white">
          <strong>User Form</strong>
        </div>
        <div className="card-body">
          <UserForm
            onSuccessAddUser={fetchUsers}
            selectUser={user}
            onSuccessUpdate={fetchUsers}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-dark text-white">
          <strong>User Form</strong>
        </div>
        <div className="card-body">
          <UserList
            users={users}
            onSuccessDelete={fetchUsers}
            onSelectUser={fetchUser}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
