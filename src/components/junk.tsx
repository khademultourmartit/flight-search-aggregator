"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useBooking } from "@/context/BookingContext";
import type { Flight, PassengerDetails } from "@/types/flight";

interface BookingFormProps {
  flight: Flight;
  passengerCount?: number;
  adt: number;
  chd: number;
  inf: number;
}

interface FormErrors {
  [key: string]: {
    fullName?: string;
    email?: string;
    phone?: string;
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

type Passenger = PassengerDetails & {
  type: "ADT" | "CHD" | "INF";
};

function createPassengers(adt: number, chd: number, inf: number): Passenger[] {
  const list: Passenger[] = [];

  for (let i = 0; i < adt; i++) {
    list.push({
      type: "ADT",
      fullName: "",
      email: "",
      phone: "",
    });
  }

  for (let i = 0; i < chd; i++) {
    list.push({
      type: "CHD",
      fullName: "",
      email: "",
      phone: "",
    });
  }

  for (let i = 0; i < inf; i++) {
    list.push({
      type: "INF",
      fullName: "",
      email: "",
      phone: "",
    });
  }

  return list;
}

export default function BookingForm({
  flight,
  passengerCount,
  adt,
  chd,
  inf,
}: BookingFormProps) {
  const router = useRouter();
  const { confirmBooking } = useBooking();

  const [passengers, setPassengers] = React.useState<Passenger[]>(() =>
    createPassengers(adt, chd, inf),
  );

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  function handleChange(index: number, field: keyof Passenger, value: string) {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  }

  function validate(): FormErrors {
    const next: FormErrors = {};

    passengers.forEach((p, i) => {
      const err: any = {};

      if (!p.fullName.trim()) {
        err.fullName = "Full name is required.";
      }

      if (p.type !== "INF") {
        if (!p.email?.trim()) {
          err.email = "Email is required.";
        } else if (!EMAIL_PATTERN.test(p.email)) {
          err.email = "Invalid email.";
        }

        if (!p.phone?.trim()) {
          err.phone = "Phone is required.";
        } else if (!PHONE_PATTERN.test(p.phone)) {
          err.phone = "Invalid phone.";
        }
      }

      if (Object.keys(err).length > 0) {
        next[i] = err;
      }
    });

    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 500));

    const booking = confirmBooking(flight, passengers, passengerCount);

    router.push(`/confirmation?ref=${booking.bookingReference}`);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="booking-wrapper">
      <div className="booking-card">
        <p className="booking-title">Passenger details</p>

        <p className="booking-subtitle">
          Booking for {passengerCount} passenger(s). We’ll use these details for
          confirmation.
        </p>

        {passengers.map((p, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>
              Pax {index + 1} ({p.type})
            </Typography>

            <input
              placeholder="Full name"
              value={p.fullName}
              onChange={(e) => handleChange(index, "fullName", e.target.value)}
              className={`booking-flight-input ${
                errors[index]?.fullName ? "error" : ""
              }`}
            />

            {errors[index]?.fullName && (
              <div className="booking-error-text">
                {errors[index]?.fullName}
              </div>
            )}

            {p.type !== "INF" && (
              <>
                <input
                  placeholder="Email"
                  value={p.email || ""}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                  className={`booking-flight-input ${
                    errors[index]?.email ? "error" : ""
                  }`}
                />

                {errors[index]?.email && (
                  <div className="booking-error-text">
                    {errors[index]?.email}
                  </div>
                )}

                <input
                  placeholder="Phone"
                  value={p.phone || ""}
                  onChange={(e) => handleChange(index, "phone", e.target.value)}
                  className={`booking-flight-input ${
                    errors[index]?.phone ? "error" : ""
                  }`}
                />

                {errors[index]?.phone && (
                  <div className="booking-error-text">
                    {errors[index]?.phone}
                  </div>
                )}
              </>
            )}
          </Box>
        ))}

        <button className="booking-flight-btn" disabled={submitting}>
          {submitting ? "Confirming..." : "Confirm booking"}
        </button>
      </div>
    </Box>
  );
}
