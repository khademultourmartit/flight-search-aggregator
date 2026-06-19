"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { AIRPORTS } from "@/utils/airports";
import type { FlightSearchParams } from "@/types/flight";

interface SearchFormProps {
  initialValues?: Partial<FlightSearchParams>;
  /** Compact layout for reuse at the top of the results page. */
  compact?: boolean;
}

const DEFAULT_DATE = "2026-06-19";

export default function SearchForm({
  initialValues,
  compact = false,
}: SearchFormProps) {
  const router = useRouter();

  const [origin, setOrigin] = React.useState(initialValues?.origin ?? "DAC");
  const [destination, setDestination] = React.useState(
    initialValues?.destination ?? "DXB"
  );
  const [date, setDate] = React.useState(initialValues?.date ?? DEFAULT_DATE);
  const [passengers, setPassengers] = React.useState(
    initialValues?.passengers ?? 1
  );
  const [formError, setFormError] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (origin === destination) {
      setFormError("Origin and destination cannot be the same airport.");
      return;
    }
    if (!date) {
      setFormError("Please choose a departure date.");
      return;
    }

    setFormError(null);

    const params = new URLSearchParams({
      origin,
      destination,
      date,
      passengers: String(passengers),
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <Paper
      elevation={compact ? 1 : 3}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Flight search"
      >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              id="origin"
              label="From"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {AIRPORTS.map((airport) => (
                <MenuItem key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              id="destination"
              label="To"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {AIRPORTS.map((airport) => (
                <MenuItem key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="departure-date"
              label="Departure date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              id="passengers"
              label="Passengers"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((count) => (
                <MenuItem key={count} value={count}>
                  {count} {count === 1 ? "passenger" : "passengers"}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={1}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<SearchIcon />}
              aria-label="Search flights"
              sx={{ height: "56px" }}
            >
              {compact ? "" : "Search"}
            </Button>
          </Grid>
        </Grid>

        {formError && (
          <Box role="alert" sx={{ color: "error.main", mt: 2, fontSize: "0.9rem" }}>
            {formError}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
