"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useBooking } from "@/context/BookingContext";
import type { Flight, PassengerDetails } from "@/types/flight";

interface BookingFormProps {
  flight: Flight;
  passengerCount?: number;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

export default function BookingForm({ flight, passengerCount = 1 }: BookingFormProps) {
  const router = useRouter();
  const { confirmBooking } = useBooking();

  const [values, setValues] = React.useState<PassengerDetails>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.fullName.trim()) {
      next.fullName = "Full name is required.";
    }
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    return next;
  }

  function handleChange(field: keyof PassengerDetails) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    // Simulate a brief processing delay, as a real payment/booking call would have.
    await new Promise((resolve) => setTimeout(resolve, 500));

    const booking = confirmBooking(flight, values, passengerCount);
    router.push(`/confirmation?ref=${booking.bookingReference}`);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate aria-label="Passenger details">
      <Typography variant="h6" component="h2" sx={{ mb: 0.5 }}>
        Passenger details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Booking for {passengerCount} {passengerCount === 1 ? "passenger" : "passengers"}.
        We&apos;ll use these contact details for the booking confirmation.
      </Typography>

      <Stack spacing={2}>
        <TextField
          id="fullName"
          label="Full name"
          value={values.fullName}
          onChange={handleChange("fullName")}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
          required
          fullWidth
          autoComplete="name"
        />
        <TextField
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          fullWidth
          autoComplete="email"
        />
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          required
          fullWidth
          autoComplete="tel"
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          disabled={submitting}
        >
          {submitting ? "Confirming..." : "Confirm booking"}
        </Button>
      </Stack>
    </Box>
  );
}
