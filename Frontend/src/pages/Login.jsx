import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import {useAuth } from "../context/AuthContext.jsx";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    // const user = JSON.parse(localStorage.getItem("user"));
    // console.log(`${form.email}    =>>  ${user.email}`);

    // if (form.email !== user.email || form.password !== user.password) {
    //   // console.log("we here");
    //   setError("Invalid email or password");
    //   return;
    // }
      // login(user)
      // navigate("/");
    
    const res = await login(form.email, form.password);
    res.success ? navigate('/') : setError(res.message);
  };
  return (
    <>
      <div className="auth-page">
        <form className="auth-card ticket-notch" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="auth-card__subtitle">Log in to manage your bookings.</p>

          {error && <div className="auth-card__error">{error}</div>}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <Button type="submit" size="lg" fullWidth>
            Log In
          </Button>
          <p className="auth-card__switch">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
