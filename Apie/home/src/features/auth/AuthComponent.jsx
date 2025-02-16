// src/features/auth/AuthComponent.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";
import { login as apiLogin } from "../../services/api";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogin = async () => {
    const response = await apiLogin({ username: "test", password: "password" });
    dispatch(login(response.data));
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthComponent;
