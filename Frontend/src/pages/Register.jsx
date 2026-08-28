import React, { useState } from "react";
import "./Auth.css";
import Button from "./../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // localStorage.setItem('user',JSON.stringify({name:form.fullName,email:form.email,password:form.password}))
    const res = await register(form.fullName, form.email, form.password);
    res.success ? navigate("/login") : setError(res.message);
    
  };
  return (
    <>
      <div className="auth-page">
        <form className="auth-card ticket-notch" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p className="auth-card__subtitle">
            Join CineBook and never miss a premiere.
          </p>
          {error && <div className="auth-card__error">{error}</div>}
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </label>
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
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <Button type="submit" size="lg" fullWidth>
            Sign Up
          </Button>
          <p className="auth-card__switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
