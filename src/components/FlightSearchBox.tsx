"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import AirportListsCard from "./Flight/AirportListsCard";
import "../scss/flight-search-box/flight-search-box.scss";
import { ClickAwayListener } from "@mui/material";
import { Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import TravelerBox from "./Flight/TravelerBox";

export interface Airport {
  id: number;
  airportCode: string;
  airportName: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
}

export default function SearchForm() {
  const router = useRouter();

  // ---------------- FROM ----------------
  const [openFrom, setOpenFrom] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [fromOptions, setFromOptions] = React.useState<Airport[]>([]);

  const [fromSearchText, setFromSearchText] = React.useState<Airport>({
    id: 1078,
    airportCode: "DAC",
    airportName: "Hazrat Shahjalal Intl Arpt",
    cityName: "Dhaka",
    cityCode: "DAC",
    countryName: "Bangladesh",
    countryCode: "BD",
  });

  // ---------------- TO ----------------
  const [openTo, setOpenTo] = React.useState(false);
  const [toKeyword, setToKeyword] = React.useState("");
  const [toOptions, setToOptions] = React.useState<Airport[]>([]);
  const [toSearchText, setToSearchText] = React.useState<Airport>({
    id: 1848,
    airportCode: "DXB",
    airportName: "Dubai Intl Arpt",
    cityName: "Dubai",
    cityCode: "DXB",
    countryName: "United Arab Emirates",
    countryCode: "AE",
  });

  // ---------------- OTHER ----------------
  const [openJourneyDate, setOpenJourneyDate] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const [travelerBoxOpen, setTravelerBoxOpen] = React.useState(false);
  const [passengers, setPassengers] = React.useState({
    adult: 1,
    child: 0,
    kid: 0,
    infant: 0,
    infantWithSeat: 0,
  });

  const totalPassengers =
    passengers.adult +
    passengers.child +
    passengers.kid +
    passengers.infant +
    passengers.infantWithSeat;
  const [error, setError] = React.useState<string | null>(null);

  // ---------------- API ----------------
  const fetchAirports = async (query: string, type: "from" | "to") => {
    if (!query || query.length < 2) return;

    const res = await fetch(
      `http://72.60.42.249:112/airports/search?searchInput=${query}`,
    );

    const data = await res.json();

    const airports: Airport[] = data?.payload || [];

    if (type === "from") setFromOptions(airports);
    else setToOptions(airports);
  };

  const updatePassenger = (type: string, action: "inc" | "dec") => {
    setPassengers((prev) => {
      const value = prev[type as keyof typeof prev];

      return {
        ...prev,
        [type]: action === "inc" ? value + 1 : Math.max(0, value - 1),
      };
    });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fromSearchText || !toSearchText) {
      setError("Select origin and destination");
      return;
    }

    if (fromSearchText.cityCode === toSearchText.cityCode) {
      setError("Cannot choose same place!");
      return;
    }

    const params = new URLSearchParams({
      origin: fromSearchText.cityCode,
      destination: toSearchText.cityCode,
      date: moment(date).format("YYYY-MM-DD"),
      passengers: String(totalPassengers),
    });

    router.push(`/search?${params.toString()}`);
  };

  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenJourneyDate(false);
    setTravelerBoxOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flight-search-box-bgcolor "
      >
        <Grid container spacing={2} alignItems="flex-end">
          {/* ---------------- FROM ---------------- */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={(e) => {
              e.stopPropagation();
              setOpenFrom((p) => !p);
              setOpenTo(false);
              setTravelerBoxOpen(false);
              setOpenJourneyDate(false);
            }}
            className="flight-from-grid"
          >
            <Box className="flight-from-box">
              {/* INPUT */}
              {openFrom && (
                <Box className="flight-input-wrapper">
                  <input
                    autoFocus
                    autoComplete="off"
                    value={searchKeyword}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchKeyword(val);
                      fetchAirports(val, "from");
                    }}
                    placeholder="Search airport..."
                    className="flight-input"
                  />
                </Box>
              )}

              {/* SELECTED */}
              {!openFrom && fromSearchText && (
                <Box className="flight-location-info">
                  <Typography className="flight-airport">From</Typography>

                  <Typography className="flight-city">
                    {fromSearchText.cityName} ({fromSearchText.airportCode})
                  </Typography>

                  <Typography className="flight-airport">
                    {fromSearchText.airportCode}, {fromSearchText.airportName}
                  </Typography>
                </Box>
              )}

              {openFrom && (
                <Box className="flight-dropdown-panel">
                  <AirportListsCard
                    airportData={fromOptions}
                    getSuggestedText={(item: Airport) => {
                      setFromSearchText(item);
                      setOpenFrom(false);
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* ---------------- TO ---------------- */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={(e) => {
              e.stopPropagation();
              setOpenTo((p) => !p);
              setOpenFrom(false);
              setTravelerBoxOpen(false);
              setOpenJourneyDate(false);
            }}
          >
            <Box className="flight-from-box">
              {openTo && (
                <Box className="flight-input-wrapper">
                  <input
                    autoFocus
                    autoComplete="off"
                    value={toKeyword}
                    onChange={(e) => {
                      const val = e.target.value;
                      setToKeyword(val);
                      fetchAirports(val, "to");
                    }}
                    placeholder="Search airport..."
                    className="flight-input"
                  />
                </Box>
              )}

              {!openTo && toSearchText && (
                <Box className="flight-location-info">
                  <Typography className="flight-airport">To</Typography>

                  <Typography className="flight-city">
                    {toSearchText.cityName} ({toSearchText.airportCode})
                  </Typography>

                  <Typography className="flight-airport">
                    {toSearchText.airportCode}, {toSearchText.airportName}
                  </Typography>
                </Box>
              )}

              {openTo && (
                <Box className="flight-dropdown-panel">
                  <AirportListsCard
                    airportData={toOptions}
                    getSuggestedText={(item: Airport) => {
                      setToSearchText(item);
                      setOpenTo(false);
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* ---------------- DATE ---------------- */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={(e) => {
              setOpenJourneyDate((prev) => !prev);
              setOpenFrom(false);
              setOpenTo(false);
              setTravelerBoxOpen(false);
            }}
          >
            <Box className="flight-from-box">
              <Box className="flight-location-info">
                <Typography className="flight-airport">Departure</Typography>

                <Typography className="flight-city">
                  {moment(date).format("DD MMM YYYY")}
                </Typography>

                <Typography className="flight-airport">
                  {moment(date).format("dddd")}
                </Typography>
              </Box>

              {openJourneyDate && (
                <Box onClick={(e) => e.stopPropagation()}>
                  <Calendar
                    className="dashboard-calendar"
                    color="#1d2959"
                    date={date}
                    direction="horizontal"
                    minDate={new Date()}
                    onChange={(item: any) => {
                      setDate(item);
                      setOpenJourneyDate(false);
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* ---------------- PASSENGERS ---------------- */}

          <Grid item xs={12} sm={6} md={2}>
            <Box
              className="flight-from-box"
              onClick={() => {
                setTravelerBoxOpen((prev) => !prev);
                setOpenFrom(false);
                setOpenTo(false);
                setOpenJourneyDate(false);
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Box className="flight-location-info">
                    <Typography className="flight-airport">
                      Passenger
                    </Typography>

                    <Typography className="flight-city">
                      {totalPassengers} Passengers
                    </Typography>

                    <Typography
                      className="flight-airport"
                      noWrap
                      title={`Adults: {passengers.adult}, Children: {passengers.child}, Infants: {passengers.infant}`}
                    >
                      ADT: {passengers.adult}, CHD: {passengers.child}, INF:{" "}
                      {passengers.infant}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* DROPDOWN */}
              {travelerBoxOpen && (
                <Box>
                  <TravelerBox
                    passengers={passengers}
                    updatePassenger={updatePassenger}
                    setTravelerBoxOpen={setTravelerBoxOpen}
                    handleClose={() => setTravelerBoxOpen(false)}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* ---------------- BUTTON ---------------- */}
          <Grid item xs={12} md={1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<SearchIcon />}
              sx={{ height: "73px" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* ---------------- ERROR ---------------- */}
        {error && (
          <Box>
            <Typography className="flight-search-error">{error}</Typography>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
