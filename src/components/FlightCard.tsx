import Link from "next/link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import type { Flight } from "@/types/flight";
import {
  arrivesNextDay,
  formatDuration,
  formatPrice,
  formatTime,
} from "@/utils/format";

interface FlightCardProps {
  flight: Flight;
  passengers?: number;
}

export default function FlightCard({ flight, passengers = 1 }: FlightCardProps) {
  const nextDay = arrivesNextDay(flight.departureTime, flight.arrivalTime);
  const stopsLabel =
    flight.stops === 0
      ? "Nonstop"
      : `${flight.stops} stop · ${flight.stopAirports.join(", ")}`;

  return (
    <Paper
      component="article"
      elevation={1}
      aria-label={`${flight.airline} flight ${flight.flightNumber}, ${formatPrice(flight.price, flight.currency)}`}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        transition: "box-shadow 0.15s ease",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={1}>
          <Avatar sx={{ bgcolor: "primary.main", fontSize: "0.8rem" }}>
            {flight.airlineCode}
          </Avatar>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {flight.airline}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {flight.flightNumber} · {flight.cabinClass}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(flight.departureTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.origin}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {formatDuration(flight.durationMinutes)} →
            </Typography>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatTime(flight.arrivalTime)}
                {nextDay && (
                  <Typography component="sup" variant="caption" sx={{ ml: 0.3 }}>
                    +1
                  </Typography>
                )}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.destination}
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label={stopsLabel}
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="h6" component="p" color="secondary.dark" sx={{ fontWeight: 700 }}>
            {formatPrice(flight.price, flight.currency)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            per passenger
          </Typography>
        </Grid>

        <Grid item xs={6} sm={2} sx={{ textAlign: { sm: "right" } }}>
          <Button
            component={Link}
            href={`/booking/${flight.id}?passengers=${passengers}`}
            variant="contained"
            color="primary"
            aria-label={`Select ${flight.airline} flight ${flight.flightNumber}`}
          >
            Select
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
