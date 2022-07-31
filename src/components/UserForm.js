import React, { useEffect, useState } from "react";
import axios from "axios";
function UserForm({ onSuccessAddUser, selectUser, onSuccessUpdate }) {
  const [user, setUser] = useState({
    account: "",
    name: "",
    password: "",
    phone: "",
    email: "",
    type: "",
  });
  const [isUpdateButton, setUpdateButton] = useState(false);

  useEffect(() => {
    if (!selectUser.id) {
      return;
    }
    setUser(selectUser);
    setUpdateButton(true);
  }, [selectUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, ...payload } = user;

    if (id) {
      try {
        await axios.put(
          `https://62b47263530b26da4cbebae9.mockapi.io/users/${id}`,
          payload
        );

        onSuccessUpdate();
        setUser({
          account: "",
          name: "",
          password: "",
          phone: "",
          email: "",
          type: "",
        });
        setUpdateButton(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(
          "https://62b47263530b26da4cbebae9.mockapi.io/users",
          user
        );
        onSuccessAddUser();
        // resetForm
        setUser({
          account: "",
          name: "",
          password: "",
          phone: "",
          email: "",
          type: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container d-flex flex-wrap">
        {/* Account */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="account" className="form-label">
            Tài khoản
          </label>
          <input
            id="account"
            className="form-control"
            required
            name="account"
            value={user.account}
            onChange={handleChange}
          />
        </div>
        {/* Name */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="name" className="form-label">
            Họ tên
          </label>
          <input
            id="name"
            className="form-control"
            required
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        {/* Mật khẩu */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        {/* Phone */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            id="phone"
            className="form-control"
            required
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        {/* Email */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            required
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        {/* Type */}
        <div className="mb-3 w-50 px-3">
          <label htmlFor="type" className="form-label">
            Mã loại người dùng
          </label>
          <select
            name="type"
            id="type"
            className="form-select"
            required
            value={user.type}
            onChange={handleChange}
          >
            <option value="" hidden>
              Vui lòng chọn
            </option>
            <option value="Khách hàng">Khách hàng</option>
            <option value="Nhà cung cấp">Nhà cung cấp</option>
            <option value="Khách VIP">VIP</option>
          </select>
        </div>
      </div>
      {/* Submit */}
      <button
        className={`btn btn-${isUpdateButton ? "primary" : "success"} ms-4`}
      >
        {isUpdateButton ? "Cập nhật" : "Đăng ký"}
      </button>
    </form>
  );
}

export default UserForm;
