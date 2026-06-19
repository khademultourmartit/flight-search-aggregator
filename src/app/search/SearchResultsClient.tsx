"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FlightSearchBox from "@/components/FlightSearchBox";
import FlightCard from "@/components/FlightCard";
import FlightFilters from "@/components/FlightFilters";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import type {
  ApiErrorResponse,
  Flight,
  FlightFiltersState,
  FlightSearchResponse,
  SortOption,
} from "@/types/flight";

type RequestState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; flights: Flight[] };

function sortFlights(flights: Flight[], sort: SortOption): Flight[] {
  const sorted = [...flights];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "duration-asc":
      return sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "departure-asc":
      return sorted.sort(
        (a, b) =>
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime(),
      );
    default:
      return sorted;
  }
}

function applyFilters(
  flights: Flight[],
  filters: FlightFiltersState,
): Flight[] {
  return flights.filter((flight) => {
    if (
      filters.airlines.length > 0 &&
      !filters.airlines.includes(flight.airline)
    ) {
      return false;
    }
    if (filters.stops === "nonstop" && flight.stops !== 0) {
      return false;
    }
    if (filters.stops === "1stop" && flight.stops !== 1) {
      return false;
    }
    if (flight.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}

export default function SearchResultsClient() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin") ?? "DAC";
  const destination = searchParams.get("destination") ?? "DXB";
  const date = searchParams.get("date") ?? "2026-06-19";
  const passengers = searchParams.get("passengers") ?? "1";

  const [state, setState] = React.useState<RequestState>({ status: "loading" });
  const [sort, setSort] = React.useState<SortOption>("price-asc");
  const [filters, setFilters] = React.useState<FlightFiltersState>({
    airlines: [],
    stops: "any",
    maxPrice: Number.MAX_SAFE_INTEGER,
  });
  const [maxPriceInitialized, setMaxPriceInitialized] = React.useState(false);

  const fetchFlights = React.useCallback(async () => {
    setState({ status: "loading" });
    try {
      const params = new URLSearchParams({
        origin,
        destination,
        date,
        passengers,
      });
      const response = await fetch(`/api/flights?${params.toString()}`);
      const body = (await response.json()) as
        | FlightSearchResponse
        | ApiErrorResponse;

      if (!response.ok) {
        const errorBody = body as ApiErrorResponse;
        setState({ status: "error", message: errorBody.error });
        return;
      }

      const successBody = body as FlightSearchResponse;
      setState({ status: "success", flights: successBody.flights });
    } catch {
      setState({
        status: "error",
        message:
          "A network error occurred. Check your connection and try again.",
      });
    }
  }, [origin, destination, date, passengers]);

  React.useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  React.useEffect(() => {
    if (state.status === "success" && !maxPriceInitialized) {
      const highest = Math.max(0, ...state.flights.map((f) => f.price));
      setFilters((prev) => ({
        ...prev,
        maxPrice: highest || Number.MAX_SAFE_INTEGER,
      }));
      setMaxPriceInitialized(true);
    }
  }, [state, maxPriceInitialized]);

  React.useEffect(() => {
    setMaxPriceInitialized(false);
    setFilters({
      airlines: [],
      stops: "any",
      maxPrice: Number.MAX_SAFE_INTEGER,
    });
  }, [origin, destination, date, passengers]);

  const airlines = React.useMemo(() => {
    if (state.status !== "success") return [];
    return Array.from(new Set(state.flights.map((f) => f.airline))).sort();
  }, [state]);

  const visibleFlights = React.useMemo(() => {
    if (state.status !== "success") return [];
    return sortFlights(applyFilters(state.flights, filters), sort);
  }, [state, filters, sort]);

  return (
    <Box pb={5}>
      <Container maxWidth="xl" >
        <Box sx={{ mb: 3 }}>
          <FlightSearchBox
          //  compact
          // initialValues={{
          //   origin,
          //   destination,
          //   date,
          //   passengers: Number(passengers),
          // }}
          />
        </Box>

        {state.status === "loading" && <LoadingState />}

        {state.status === "error" && (
          <ErrorState message={state.message} onRetry={fetchFlights} />
        )}

        {state.status === "success" && state.flights.length === 0 && (
          <EmptyState origin={origin} destination={destination} date={date} />
        )}

        {state.status === "success" && state.flights.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FlightFilters
                airlines={airlines}
                filters={filters}
                onFiltersChange={setFilters}
                sort={sort}
                onSortChange={setSort}
                resultCount={visibleFlights.length}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack spacing={2}>
                {visibleFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    passengers={Number(passengers)}
                  />
                ))}
                {visibleFlights.length === 0 && (
                  <Box
                    sx={{ textAlign: "center", py: 6, color: "text.secondary" }}
                  >
                    No flights match the selected filters.
                  </Box>
                )}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
