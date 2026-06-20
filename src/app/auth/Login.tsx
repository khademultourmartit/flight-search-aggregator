"use client";

import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginBg from "../../../public/assests/images/loginBg.svg";
import "../../scss/auth/auth.scss";

const Login = () => {
  const [formData, setFormData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<any>({ login: false });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
      className="auth-wrapper"
      sx={{ backgroundImage: `url(${loginBg.src})` }}
    >
      <Box className="auth-card">
        <h1 className="auth-title">Log in to your account</h1>
        <p className="auth-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="auth-input"
            onChange={handleChange}
            autoComplete="one-time-code"
          />

          <div className="auth-password-box">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input"
              onChange={handleChange}
              autoComplete="one-time-code"
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>

          <button className="auth-btn" disabled={loading.login}>
            {loading.login && <CircularProgress size={14} />}
            Login
          </button>
        </form>

        <p className="auth-footer">
          Forgot password? <Link href="/forgot-password">Reset</Link>
        </p>

        <p className="auth-footer">
          No account? <Link href="/register">Register</Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
