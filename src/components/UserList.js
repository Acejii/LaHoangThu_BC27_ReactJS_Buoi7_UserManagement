import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList({ users, onSuccessDelete, onSelectUser }) {
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://62b47263530b26da4cbebae9.mockapi.io/users/${userId}`
      );
      onSuccessDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = (userId) => {
    onSelectUser(userId);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tài khoản</th>
          <th>Mật khẩu</th>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Email</th>
          <th>Loại người dùng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.account}</td>
            <td>{user.password}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.type}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => handleSelectUser(user.id)}
              >
                Chỉnh sửa
              </button>
              <button
                className="btn btn-danger ms-1"
                onClick={() => handleDelete(user.id)}
              >
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
