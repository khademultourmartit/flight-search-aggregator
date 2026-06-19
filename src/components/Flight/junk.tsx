"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

interface Airport {
  id: number;
  airportCode: string;
  airportName: string;
  cityName: string;
  cityCode: string; // ✅ IMPORTANT
  countryName: string;
  countryCode: string;
}

const DEFAULT_DATE = "2026-06-19";

export default function SearchForm() {
  const router = useRouter();
  const [origin, setOrigin] = React.useState<Airport | null>(null);
  const [destination, setDestination] = React.useState<Airport | null>(null);

  const [date, setDate] = React.useState(DEFAULT_DATE);
  const [passengers, setPassengers] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);

  const [originOptions, setOriginOptions] = React.useState<Airport[]>([]);
  const [destinationOptions, setDestinationOptions] = React.useState<Airport[]>(
    [],
  );

  const [loadingOrigin, setLoadingOrigin] = React.useState(false);
  const [loadingDestination, setLoadingDestination] = React.useState(false);

  // ---------------- API ----------------
  const fetchAirports = async (
    query: string,
    type: "origin" | "destination",
  ) => {
    if (!query || query.length < 2) return;

    try {
      if (type === "origin") setLoadingOrigin(true);
      else setLoadingDestination(true);

      const res = await fetch(
        `http://72.60.42.249:112/airports/search?searchInput=${query}`,
      );

      const data = await res.json();

      const airports: Airport[] = data?.payload || [];

      if (type === "origin") setOriginOptions(airports);
      else setDestinationOptions(airports);
    } catch (err) {
      console.error(err);
    } finally {
      if (type === "origin") setLoadingOrigin(false);
      else setLoadingDestination(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!origin || !destination) {
      setError("Select origin and destination");
      return;
    }

    if (origin.cityCode === destination.cityCode) {
      setError("Origin and destination cannot be same");
      return;
    }

    const params = new URLSearchParams({
      origin: origin.cityCode,
      destination: destination.cityCode,
      date,
      passengers: String(passengers),
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="flex-end">
        {/* ---------------- ORIGIN ---------------- */}

        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={originOptions}
            value={origin}
            loading={loadingOrigin}
            getOptionLabel={(option) =>
              option ? `${option.cityName} (${option.airportCode})` : ""
            }
            isOptionEqualToValue={(opt, val) => opt.cityCode === val.cityCode}
            onInputChange={(e, value) => fetchAirports(value, "origin")}
            onChange={(e, newValue) => setOrigin(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingOrigin && <CircularProgress size={18} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* ---------------- DESTINATION ---------------- */}
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={destinationOptions}
            value={destination}
            loading={loadingDestination}
            getOptionLabel={(option) =>
              option ? `${option.cityName} (${option.airportCode})` : ""
            }
            isOptionEqualToValue={
              (opt, val) => opt.cityCode === val.cityCode // ✅ FIXED
            }
            onInputChange={(e, value) => fetchAirports(value, "destination")}
            onChange={(e, newValue) => setDestination(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingDestination && <CircularProgress size={18} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* ---------------- DATE ---------------- */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label="Departure date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* ---------------- PASSENGERS ---------------- */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Passengers"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            SelectProps={{ native: true }}
          >
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* ---------------- BUTTON ---------------- */}
        <Grid item xs={12} md={1}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{ height: "56px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* ---------------- ERROR ---------------- */}
      {error && <Box sx={{ color: "red", mt: 2 }}>{error}</Box>}
    </Box>
  );
}
