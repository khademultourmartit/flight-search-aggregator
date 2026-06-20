"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Grid, Stack, Container } from "@mui/material";

import logo from "../../public/assests/images/logo.png";
import "../scss/footer/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="xl">
        {/* ================= FIRST ROW ================= */}
        <Box className="footer-first-row">
          <Grid container alignItems="center" justifyContent="space-between">
            {/* LEFT SIDE */}
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box className="footer-logo-wrapper">
                  <Link href="/">
                    <Image src={logo} alt="logo" width={120} height={40} />
                  </Link>
                </Box>

                <Stack spacing={0.5}>
                  <Typography className="certificate-title">
                    A sister concern of Flight Air
                  </Typography>

                  <Typography className="certificate-title">
                    MoCAT Certificate No: XXXXXXXXX
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* RIGHT SIDE */}
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Typography className="payment-title">
                  Payment Method
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Image src="/bank.svg" alt="Bank" width={80} height={50} />
                  <Image src="/bkash.svg" alt="bKash" width={60} height={50} />
                  <Image src="/nagad.svg" alt="Nagad" width={60} height={50} />
                  <Image
                    src="/rocket.svg"
                    alt="Rocket"
                    width={60}
                    height={50}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        sx={{
          borderBottom: "2px solid rgba(174, 170, 244, 0.267)",
        }}
      ></Box>

      <Container maxWidth="xl">
        {/* ================= SECOND ROW ================= */}
        <Box className="footer-second-row">
          <Grid container alignItems="center" justifyContent="space-between">
            {/* LEFT SIDE */}
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography className="copyright">
                  © 2025 {process.env.NEXT_PUBLIC_COMPANY_NAME}. All Rights
                  Reserved
                </Typography>

                <Typography className="powered-by">
                  Developed by{" "}
                  <a href="#" rel="noopener noreferrer">
                    Flight Air
                  </a>
                </Typography>
              </Stack>
            </Grid>

            {/* RIGHT SIDE NAV */}
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                flexWrap="wrap"
              >
                <Link href="#">Terms & Conditions</Link>
                <span>|</span>
                <Link href="#">Privacy Policy</Link>
                <span>|</span>
                <Link href="#">Refund Policy</Link>
                <span>|</span>
                <Link href="#">Contact Us</Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
