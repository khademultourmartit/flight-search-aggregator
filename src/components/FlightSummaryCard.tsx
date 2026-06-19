import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import type { Flight } from "@/types/flight";
import {
  arrivesNextDay,
  formatDate,
  formatDuration,
  formatPrice,
  formatTime,
} from "@/utils/format";

interface FlightSummaryCardProps {
  flight: Flight;
}

export default function FlightSummaryCard({ flight }: FlightSummaryCardProps) {
  const nextDay = arrivesNextDay(flight.departureTime, flight.arrivalTime);
  const stopsLabel =
    flight.stops === 0
      ? "Nonstop"
      : `${flight.stops} stop · ${flight.stopAirports.join(", ")}`;

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        {flight.airline} {flight.flightNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {formatDate(flight.departureTime)}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="h6">{formatTime(flight.departureTime)}</Typography>
          <Typography variant="caption" color="text.secondary">
            {flight.originCity} ({flight.origin})
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {formatDuration(flight.durationMinutes)}
        </Typography>
        <div style={{ textAlign: "right" }}>
          <Typography variant="h6">
            {formatTime(flight.arrivalTime)}
            {nextDay ? " +1" : ""}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {flight.destinationCity} ({flight.destination})
          </Typography>
        </div>
      </Stack>

      <Chip size="small" label={stopsLabel} variant="outlined" sx={{ mt: 2 }} />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Cabin class
        </Typography>
        <Typography variant="body2">{flight.cabinClass}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Checked baggage
        </Typography>
        <Typography variant="body2">{flight.baggageAllowanceKg} kg</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Refundable
        </Typography>
        <Typography variant="body2">{flight.refundable ? "Yes" : "No"}</Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography variant="subtitle2">Price per passenger</Typography>
        <Typography variant="h5" color="secondary.dark" sx={{ fontWeight: 700 }}>
          {formatPrice(flight.price, flight.currency)}
        </Typography>
      </Stack>
    </Paper>
  );
}
