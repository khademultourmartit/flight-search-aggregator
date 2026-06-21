import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import "../../scss/flight-search-box/flight-search-box.scss";

const TravelerBox = ({
  passengers,
  updatePassenger,
  handleClose,
  setTravelerBoxOpen,
}: any) => {
  const handleClick = (
    e: React.MouseEvent,
    type: string,
    action: "inc" | "dec",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updatePassenger(type, action);
  };

  return (
    <Box className="traveler-box">
      <Box p={2} onClick={(e) => e.stopPropagation()}>
        {/* ---------------- TITLE ---------------- */}
        <Typography className="section-title">Passengers</Typography>

        {/* ---------------- ADULT ---------------- */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1.5}
        >
          <Box width="60%">
            <Typography className="counter-label">Adult</Typography>
            <Typography className="counter-subtext">
              12 years and above
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            width="40%"
            justifyContent="space-between"
          >
            <button
              onClick={(e) => handleClick(e, "adult", "dec")}
              className="counter-btn decrement"
            >
              -
            </button>

            <Typography className="count-value">{passengers.adult}</Typography>

            <button
              onClick={(e) => handleClick(e, "adult", "inc")}
              className="counter-btn increment"
            >
              +
            </button>
          </Stack>
        </Stack>

        {/* ---------------- CHILD ---------------- */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1.5}
        >
          <Box width="60%">
            <Typography className="counter-label">Child</Typography>
            <Typography className="counter-subtext">
              2 years - under 12 years
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            width="40%"
            justifyContent="space-between"
          >
            <button
              onClick={(e) => handleClick(e, "child", "dec")}
              className="counter-btn decrement"
            >
              -
            </button>

            <Typography className="count-value">{passengers.child}</Typography>

            <button
              onClick={(e) => handleClick(e, "child", "inc")}
              className="counter-btn increment"
            >
              +
            </button>
          </Stack>
        </Stack>

        {/* ---------------- INFANT ---------------- */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1.5}
        >
          <Box width="60%">
            <Typography className="counter-label">Infant</Typography>
            <Typography className="counter-subtext">Below 2 years</Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            width="40%"
            justifyContent="space-between"
          >
            <button
              onClick={(e) => handleClick(e, "infant", "dec")}
              className="counter-btn decrement"
            >
              -
            </button>

            <Typography className="count-value">{passengers.infant}</Typography>

            <button
              onClick={(e) => handleClick(e, "infant", "inc")}
              className="counter-btn increment"
            >
              +
            </button>
          </Stack>
        </Stack>

        <Box mt={2} textAlign="right">
          <Button size="small" onClick={handleClose} className="done-btn">
            DONE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelerBox;
