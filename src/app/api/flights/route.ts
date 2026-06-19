import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/flights";
import type {
  ApiErrorResponse,
  FlightSearchResponse,
} from "@/types/flight";

/**
 * GET /api/flights?origin=DAC&destination=DXB&date=2026-06-19&passengers=1
 *
 * This is intentionally a real (if mock) HTTP endpoint rather than a
 * direct function import, so the client genuinely exercises loading,
 * empty, and error states the way it would against a real backend.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const passengersRaw = searchParams.get("passengers");

  if (!origin || !destination || !date || !passengersRaw) {
    const body: ApiErrorResponse = {
      error:
        "Missing required search parameters. Origin, destination, date, and passengers are all required.",
    };
    return NextResponse.json(body, { status: 400 });
  }

  const passengers = Number(passengersRaw);
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 9) {
    const body: ApiErrorResponse = {
      error: "Passengers must be a whole number between 1 and 9.",
    };
    return NextResponse.json(body, { status: 400 });
  }

  if (origin === destination) {
    const body: ApiErrorResponse = {
      error: "Origin and destination cannot be the same airport.",
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const flights = await searchFlights({ origin, destination, date, passengers });
    const body: FlightSearchResponse = {
      flights,
      query: { origin, destination, date, passengers },
    };
    return NextResponse.json(body, { status: 200 });
  } catch {
    const body: ApiErrorResponse = {
      error: "Something went wrong while searching for flights. Please try again.",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
