"use client";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import worldExploreImage from "../../../public/assests/homeService/worldExplore.jpg";
import "../../scss/home-page/home-page.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const WorldExplore = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "300px", md: "350px" },
        backgroundImage: `url(${worldExploreImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Container maxWidth="xl">
        <Typography className="home-page-world-explore">
          Start Exploring the World with Us!
        </Typography>

        <Box mt={4}>
          <button className="explore-btn">
            Get Started
            <ArrowForwardIcon className="explore-icon" />
          </button>
        </Box>
      </Container>
    </Box>
  );
};

export default WorldExplore;
