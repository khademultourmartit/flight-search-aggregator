"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assests/images/logo.png";

import "@/scss/header/header.scss";

const Header = () => {
  return (
    <Box className="home-page-header">
      <Container maxWidth="xl">
        <div className="header-content">
          <Link href="/" className="header-logo">
            <Image width={120} height={40} src={logo} alt="logo" />
          </Link>

          <Link href="/login">
            <button className="login-button">Login / Signup</button>
          </Link>
        </div>
      </Container>
    </Box>
  );
};

export default Header;
