import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import type { Flight } from "@/types/flight";
import "../scss/flight-booking/flight-booking.scss";
import {
  arrivesNextDay,
  formatDate,
  formatDuration,
  formatPrice,
  formatTime,
} from "@/utils/format";

interface FlightSummaryCardProps {
  flight: Flight;
  passengerCount: number;
}

export default function FlightSummaryCard({
  flight,
  passengerCount,
}: FlightSummaryCardProps) {
  const nextDay = arrivesNextDay(flight.departureTime, flight.arrivalTime);
  const stopsLabel =
    flight.stops === 0
      ? "Nonstop"
      : `${flight.stops} stop · ${flight.stopAirports.join(", ")}`;

  return (
    <Paper sx={{ p: 3 }} elevation={1} className="flight-summary-card">
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        {flight.airline} {flight.flightNumber}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {formatDate(flight.departureTime)}
      </Typography>

      <Stack direction="row" alignItems="center" className="flight-row">
        {/* LEFT */}
        <div className="flight-left">
          <Typography variant="h6">
            {formatTime(flight.departureTime)}
          </Typography>
          <Typography variant="caption">
            {flight.originCity} ({flight.origin})
          </Typography>
        </div>

        {/* CENTER */}
        <div className="flight-center">
          <Typography variant="body2" className="flight-duration">
            {formatDuration(flight.durationMinutes)}
          </Typography>

          <div className="flight-timeline-line">
            <span className="timeline-dot start" />
            <span className="timeline-dot end" />
            <span className="timeline-arrow" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flight-right">
          <Typography variant="h6">
            {formatTime(flight.arrivalTime)}
            {nextDay ? " +1" : ""}
          </Typography>
          <Typography variant="caption">
            {flight.destinationCity} ({flight.destination})
          </Typography>
        </div>
      </Stack>

      <Chip size="small" label={stopsLabel} className="flight-chip" />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="body2">Cabin class</Typography>
        <Typography variant="body2">{flight.cabinClass}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
        <Typography variant="body2">Checked baggage</Typography>
        <Typography variant="body2">{flight.baggageAllowanceKg} kg</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="body2">Refundable</Typography>
        <Typography variant="body2">
          {flight.refundable ? "Yes" : "No"}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography variant="body2">Price per passenger</Typography>
        <Typography
          variant="body2"
          color="secondary.dark"
          sx={{ fontWeight: 700 }}
        >
          {formatPrice(flight.price, flight.currency)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        mt={1}
      >
        <Typography variant="subtitle2">
          Total Price of {passengerCount} Passenger
        </Typography>
        <Typography
          variant="h5"
          color="secondary.dark"
          sx={{ fontWeight: 700 }}
        >
          {formatPrice(flight.price * Number(passengerCount), flight.currency)}
        </Typography>
      </Stack>
    </Paper>
  );
}
