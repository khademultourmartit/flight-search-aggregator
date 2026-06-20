"use client";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import "../../scss/home-page/home-page.scss";

const TrustedAirline = () => {
  const airlines = [
    { code: "BS", name: "US-Bangla Airlines" },
    { code: "2A", name: "Air Astra" },
    { code: "VQ", name: "Novo Air" },
    { code: "BG", name: "Biman Bangladesh Airlines" },
    { code: "QR", name: "Qatar Airways" },
    { code: "EK", name: "Emirates" },
    { code: "SQ", name: "Singapore Airlines" },
    { code: "MH", name: "Malaysia Airlines" },
    { code: "TK", name: "Turkish Airlines" },
    { code: "AI", name: "Air India" },
    { code: "CX", name: "Cathay Pacific" },
    { code: "6E", name: "IndiGo" },
  ];

  return (
    <Box>
      <Typography className="home-service-header " mb={3}>
        Our Trusted Airlines Alliances
      </Typography>

      <Box className="trusted-airline-section">
        <Grid container spacing={3} justifyContent="center">
          {airlines.map((airline) => (
            <Grid item xs={6} sm={4} md={2.4} key={airline.code}>
              <Box className="trusted-airline-card">
                <Image
                  width={50}
                  height={50}
                  src={`https://tourmart-assets.s3.ap-south-1.amazonaws.com/airline-logo/${airline.code}.png`}
                  alt={airline.name}
                />
                <Typography >
                  {airline.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TrustedAirline;
