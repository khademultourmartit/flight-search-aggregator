"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Box, Grid, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginBg from "../../../public/assests/images/loginBg.svg";
import "../../scss/auth/login.scss";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<any>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {};

  return (
    <Box
      mb={1}
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      px={2.5}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <Box className="form">
              <Box>
                <h1 className="brand-title"> Log in to your account</h1>
                <p className="subtitle">Sign in to continue</p>
              </Box>

              <form onSubmit={handleSubmit}>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  className="input-field"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email Address"
                  style={{
                    background: "#fff",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.password}
                    style={{
                      background: "#fff",
                    }}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#555",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "24px",
                      fontSize: "20px",
                    }}
                  >
                    {showPassword ? (
                      <Visibility sx={{ fontSize: "17px" }} />
                    ) : (
                      <VisibilityOff sx={{ fontSize: "17px" }} />
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading.login}
                  className={`login-button ${loading.login ? "disabled" : ""}`}
                >
                  {loading.login && (
                    <CircularProgress size={15} className="loading-icon" />
                  )}
                  Login
                </button>
              </form>

              <Box>
                <p className="login-footer">
                  Forgot your password?{" "}
                  <Link href="/forgot-password" className="footer-link">
                    Reset Here
                  </Link>
                </p>

                <p className="login-footer">
                  Don’t have an account?{" "}
                  <Link href="/register" className="footer-link">
                    Register Now{" "}
                  </Link>
                </p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
