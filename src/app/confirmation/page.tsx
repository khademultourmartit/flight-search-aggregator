"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useBooking } from "@/context/BookingContext";
import FlightSummaryCard from "@/components/FlightSummaryCard";
import { formatDate } from "@/utils/format";

export default function ConfirmationPage() {
  const { booking } = useBooking();

  if (!booking) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          No booking to show
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We don&apos;t have an active booking for this session. Search for a
          flight to get started.
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Search flights
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack alignItems="center" textAlign="center" sx={{ mb: 4 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Booking confirmed
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Reference <strong>{booking.bookingReference}</strong> · booked on{" "}
          {formatDate(booking.bookedAt)}
        </Typography>
      </Stack>

      <Box sx={{ maxWidth: 480, mx: "auto", mb: 4 }}>
        <FlightSummaryCard flight={booking.flight} />
      </Box>

      <Box sx={{ maxWidth: 480, mx: "auto" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Passenger
        </Typography>
        <Typography variant="body2">{booking.passenger.fullName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {booking.passenger.email} · {booking.passenger.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {booking.passengerCount}{" "}
          {booking.passengerCount === 1 ? "passenger" : "passengers"}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button component={Link} href="/" variant="outlined">
          Book another flight
        </Button>
      </Box>
    </Container>
  );
}
