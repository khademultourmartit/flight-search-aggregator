import flightsData from "@/data/flights.json";
import type { Flight, FlightSearchParams } from "@/types/flight";

const ALL_FLIGHTS = flightsData as Flight[];

/**
 * Simulates network/database latency so the UI's loading state is
 * actually visible during development and demos.
 */
function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSameCalendarDate(isoDateTime: string, isoDate: string): boolean {
  return isoDateTime.slice(0, 10) === isoDate;
}

/**
 * Filters the in-memory flight list by route, date, and whether enough
 * seats remain for the requested passenger count.
 */
export async function searchFlights(
  params: FlightSearchParams
): Promise<Flight[]> {
  await simulateLatency(600);

  return ALL_FLIGHTS.filter(
    (flight) =>
      flight.origin === params.origin &&
      flight.destination === params.destination &&
      isSameCalendarDate(flight.departureTime, params.date) &&
      flight.seatsAvailable >= params.passengers
  );
}

export async function getFlightById(id: string): Promise<Flight | undefined> {
  await simulateLatency(300);
  return ALL_FLIGHTS.find((flight) => flight.id === id);
}

export function getAllAirlines(): string[] {
  return Array.from(new Set(ALL_FLIGHTS.map((f) => f.airline))).sort();
}

export function getHighestPrice(): number {
  return Math.max(...ALL_FLIGHTS.map((f) => f.price));
}
