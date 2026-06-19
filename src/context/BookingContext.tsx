"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Booking, Flight, PassengerDetails } from "@/types/flight";
import { generateBookingReference } from "@/utils/format";

const STORAGE_KEY = "ibox-active-booking";

interface BookingContextValue {
  booking: Booking | null;
  /** Creates and stores a confirmed booking, returning it for convenience. */
  confirmBooking: (
    flight: Flight,
    passenger: PassengerDetails,
    passengerCount: number
  ) => Booking;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking | null>(null);

  // Hydrate from sessionStorage on mount so a confirmation page refresh
  // doesn't lose the booking the user just made.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        setBooking(JSON.parse(raw) as Booking);
      }
    } catch {
      // Corrupt or inaccessible storage: ignore, user can re-book.
    }
  }, []);

  const confirmBooking = useCallback(
    (flight: Flight, passenger: PassengerDetails, passengerCount: number) => {
      const newBooking: Booking = {
        bookingReference: generateBookingReference(),
        flight,
        passenger,
        passengerCount,
        bookedAt: new Date().toISOString(),
      };
      setBooking(newBooking);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newBooking));
      } catch {
        // sessionStorage unavailable (e.g. private mode) - booking still
        // works for this session via in-memory state.
      }
      return newBooking;
    },
    []
  );

  const clearBooking = useCallback(() => {
    setBooking(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ booking, confirmBooking, clearBooking }),
    [booking, confirmBooking, clearBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
