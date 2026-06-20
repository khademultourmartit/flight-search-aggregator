"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
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
  fullName?: string;
  email?: string;
  phone?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

export default function BookingForm({
  flight,
  adt,
  chd,
  inf,
}: BookingFormProps) {
  const router = useRouter();
  const { confirmBooking } = useBooking();

  const totalPassengers = adt + chd + inf;

  const [values, setValues] = React.useState<PassengerDetails[]>(
    Array.from({ length: totalPassengers }, () => ({
      fullName: "",
      email: "",
      phone: "",
    })),
  );

  const [errors, setErrors] = React.useState<Record<number, FormErrors>>({});
  const [submitting, setSubmitting] = React.useState(false);

  function validate() {
    const next: Record<number, FormErrors> = {};

    values.forEach((p, index) => {
      const err: FormErrors = {};

      if (!p.fullName.trim()) err.fullName = "Full name is required.";

      if (!p.email.trim()) {
        err.email = "Email is required.";
      } else if (!EMAIL_PATTERN.test(p.email.trim())) {
        err.email = "Enter a valid email address.";
      }

      if (!p.phone.trim()) {
        err.phone = "Phone number is required.";
      } else if (!PHONE_PATTERN.test(p.phone.trim())) {
        err.phone = "Enter a valid phone number.";
      }

      if (Object.keys(err).length > 0) {
        next[index] = err;
      }
    });

    return next;
  }
  function handleChange(index: number, field: keyof PassengerDetails) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setValues((prev) => {
        const copy = [...prev];

        const current = copy[index];
        if (!current) return prev;

        copy[index] = {
          ...current,
          [field]: value,
        } as PassengerDetails;

        return copy;
      });
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));

    const booking = confirmBooking(flight, values, totalPassengers);

    router.push(`/confirmation?ref=${booking.bookingReference}`);
  }

  function getPassengerLabel(
    index: number,
    adt: number,
    chd: number,
    inf: number,
  ) {
    if (index < adt) return `Pax ${index + 1} Adult`;
    if (index < adt + chd) return `Pax ${index + 1} Child`;
    return `Pax ${index + 1} Infant`;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="booking-wrapper">
      <div className="booking-card">
        <p className="booking-title">Passenger details</p>

        <p className="booking-subtitle">Total passengers: {totalPassengers}</p>

        {values.map((p, index) => (
          <div key={index} className="passenger-block">
            <p className="passenger-title">
              {getPassengerLabel(index, adt, chd, inf)}
            </p>

            {/* FULL NAME */}
            <input
              placeholder="Full name"
              value={p.fullName}
              onChange={handleChange(index, "fullName")}
              className={`booking-flight-input ${
                errors[index]?.fullName ? "error" : ""
              }`}
            />
            {errors[index]?.fullName && (
              <div className="booking-error-text">{errors[index].fullName}</div>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email address"
              value={p.email}
              onChange={handleChange(index, "email")}
              className={`booking-flight-input ${
                errors[index]?.email ? "error" : ""
              }`}
            />
            {errors[index]?.email && (
              <div className="booking-error-text">{errors[index].email}</div>
            )}

            {/* PHONE */}
            <input
              type="tel"
              placeholder="Phone number"
              value={p.phone}
              onChange={handleChange(index, "phone")}
              className={`booking-flight-input ${
                errors[index]?.phone ? "error" : ""
              }`}
            />
            {errors[index]?.phone && (
              <div className="booking-error-text">{errors[index].phone}</div>
            )}
          </div>
        ))}

        <button className="booking-flight-btn" disabled={submitting}>
          {submitting ? "Confirming..." : "Confirm booking"}
        </button>
      </div>
    </Box>
  );
}
