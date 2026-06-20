"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "../../scss/flight-booking-confirm/flight-booking-confirm.scss";

import { useBooking } from "@/context/BookingContext";
import FlightSummaryCard from "@/components/FlightSummaryCard";
import { formatDate } from "@/utils/format";

export default function ConfirmationPage() {
  const { booking } = useBooking();

  if (!booking) {
    return (
      <Container
        maxWidth="sm"
        sx={{ py: 10, textAlign: "center" }}
        className="confirmation-page"
      >
        <Stack className="confirmation-header">
          <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
            No booking to show
          </Typography>

          <Typography className="subtitle">
            We don&apos;t have an active booking for this session. Search for a
            flight to get started.
          </Typography>
        </Stack>

        <Box className="action-section" mb={2}>
          <Link href="/" className="custom-link-btn">
            Search Flight
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="confirmation-page">
      <Stack className="confirmation-header">
        <CheckCircleOutlineIcon className="success-icon" />
        <Typography className="title">Booking confirmed</Typography>
        <Typography className="subtitle">
          Reference <strong>{booking.bookingReference}</strong> booked on{" "}
          {formatDate(booking.bookedAt)}
        </Typography>
      </Stack>

      <Box className="flight-summary-wrapper">
        <FlightSummaryCard
          flight={booking.flight}
          passengerCount={booking.passengerCount}
        />
      </Box>

      <Box className="passenger-section">
        <Typography className="section-title">Passenger Details</Typography>

        <Box component="table" className="passenger-table">
          <thead>
            <tr>
              <th>Pax</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {booking.passengers.map((p, index) => (
              <tr key={index}>
                <td>Pax {index + 1}</td>
                <td>{p.fullName}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>

      <Box className="action-section" mb={2}>
        <Link href="/" className="custom-link-btn">
          Book another flight
        </Link>
      </Box>
    </Container>
  );
}
