import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
} from "@mui/material";

import "../../scss/flight-search-box/flight-search-box.scss";

const TravelerBox = ({
  adultDecrement,
  adultCount,
  adultInclement,
  childDecrement,
  childCount,
  childIncrement,
  kidDecrement,
  kidCount,
  kidInclement,
  infantDecrement,
  infantCount,
  infantIncrement,
  infantWithSeatIncrement,
  infantWithSeatCount,
  infantWithSeatDecrement,
  handleClose,
}: any) => {
  return (
    <Box className="traveler-box">
      <Box p={2}>
        {/* Traveler Section */}
        <Typography className="section-title">Passengers</Typography>
        {/* <Box className="divider-travelBox" /> */}

        {/* Adult */}
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
            <button onClick={adultDecrement} className="counter-btn decrement">
              -
            </button>
            <Typography className="count-value">{adultCount}</Typography>
            <button onClick={adultInclement} className="counter-btn increment">
              +
            </button>
          </Stack>
        </Stack>

        {/* Child */}
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
            <button onClick={childDecrement} className="counter-btn decrement">
              -
            </button>
            <Typography className="count-value">{childCount}</Typography>
            <button onClick={childIncrement} className="counter-btn increment">
              +
            </button>
          </Stack>
        </Stack>

        {/* Kids */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1.5}
        >
          <Box width="60%">
            <Typography className="counter-label">Kids</Typography>
            <Typography className="counter-subtext">Aged 2y - 5y</Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            width="40%"
            justifyContent="space-between"
          >
            <button onClick={kidDecrement} className="counter-btn decrement">
              -
            </button>
            <Typography className="count-value">{kidCount}</Typography>
            <button onClick={kidInclement} className="counter-btn increment">
              +
            </button>
          </Stack>
        </Stack>

        {/* Infant */}
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
            <button onClick={infantDecrement} className="counter-btn decrement">
              -
            </button>
            <Typography className="count-value">{infantCount}</Typography>
            <button onClick={infantIncrement} className="counter-btn increment">
              +
            </button>
          </Stack>
        </Stack>

        {/* Infant With Seat */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography className="counter-label">Infant With Seat</Typography>
            <Typography className="counter-subtext">Below 24 m</Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            width="40%"
            justifyContent="space-between"
          >
            <button
              onClick={infantWithSeatDecrement}
              className="counter-btn decrement"
            >
              -
            </button>
            <Typography className="count-value">
              {infantWithSeatCount}
            </Typography>
            <button
              onClick={infantWithSeatIncrement}
              className="counter-btn increment"
            >
              +
            </button>
          </Stack>
        </Stack>

        {/* Class Name Section */}

        {/* <Typography className="section-title" mt={1}>
          Class Name
        </Typography>
        <Box className="divider" />
        <FormControl>
          <RadioGroup value={className} onChange={handleClassName}>
            <Grid container>
              {flightClasses.map((classes, i) => (
                <Grid item xs={12} key={i}>
                  <FormControlLabel
                    value={classes}
                    control={
                      <Radio
                        sx={{
                          color: "var(--theme-color)",
                          "&.Mui-checked": { color: "var(--theme-color)" },
                        }}
                      />
                    }
                    label={
                      <Typography className="radio-label">
                        {classes.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl> */}

        {/* Done Button */}
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
