"use client";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import "../../scss/home-page/home-page.scss";

import Deal from "../../../public/assests/homeService/deal.png";
import Payment from "../../../public/assests/homeService/payment.png";
import search from "../../../public/assests/homeService/search.png";
import support from "../../../public/assests/homeService/support.png";

const HomeService = () => {
  return (
    <Box>
      <Typography className="home-service-header" mb={3}>
        Our Service
      </Typography>
      <Box className="home-service-section">
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Box className="home-service">
              <Image
                src={Deal}
                alt="A beautiful view"
                width={120}
                height={120}
              />

              <Typography className="home-service-title">
                Best Travel Deals in Bangladesh
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box className="home-service">
              <Image
                src={search}
                alt="A beautiful view"
                width={120}
                height={120}
              />

              <Typography className="home-service-title">
                Thousands of Flight & Hotel Deals
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box className="home-service">
              <Image
                src={Payment}
                alt="A beautiful view"
                width={120}
                height={120}
              />
              <Typography className="home-service-title">
                Multiple Payment Methods
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box className="home-service">
              <Image
                src={support}
                alt="A beautiful view"
                width={120}
                height={120}
              />
              <Typography className="home-service-title">
                24/7 Customer Service Support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeService;
