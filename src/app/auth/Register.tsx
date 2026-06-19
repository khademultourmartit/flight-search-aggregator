"use client";

import React, { useState, FormEvent } from "react";
import {
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Link from "next/link";
import loginBg from "../../../public/assests/images/loginBg.svg";
import "../../scss/auth/auth.scss";

const RegisterForm = () => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<any>({ register: false });
  const [showPassword, setShowPassword] = useState(false);

  const [isUser, setIsUser] = useState(true);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      className="auth-wrapper"
      sx={{ backgroundImage: `url(${loginBg.src})` }}
    >
      <Box className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Sign up to continue </p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="auth-input"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            className="auth-input"
            onChange={handleChange}
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="auth-input"
            onChange={handleChange}
          />

          <div className="auth-checkbox-row">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isUser}
                  onChange={() => setIsUser(true)}
                />
              }
              label="Customer"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={!isUser}
                  onChange={() => setIsUser(false)}
                />
              }
              label="Agent"
            />
          </div>

          <button className="auth-btn" disabled={loading.register}>
            {loading.register && <CircularProgress size={14} />}
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have account? <Link href="/login">Sign in</Link>
        </p>
      </Box>
    </Box>
  );
};

export default RegisterForm;