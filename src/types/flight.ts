export type CabinClass = "Economy" | "Business";

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  /** ISO 8601 local datetime string, e.g. 2026-06-19T16:00:00 */
  departureTime: string;
  /** ISO 8601 local datetime string, e.g. 2026-06-19T18:50:00 */
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  stopAirports: string[];
  stopCities: string[];
  price: number;
  currency: string;
  cabinClass: CabinClass;
  seatsAvailable: number;
  baggageAllowanceKg: number;
  refundable: boolean;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  /** ISO date, e.g. 2026-06-19 */
  date: string;
  passengers: number;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "departure-asc";

export type StopsFilter = "any" | "nonstop" | "1stop";

export interface FlightFiltersState {
  airlines: string[];
  stops: StopsFilter;
  maxPrice: number;
}

export interface PassengerDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface Booking {
  bookingReference: string;
  flight: Flight;
  passenger: PassengerDetails;
  passengerCount: number;
  bookedAt: string;
}

/** Shape returned by GET /api/flights */
export interface FlightSearchResponse {
  flights: Flight[];
  query: FlightSearchParams;
}

/** Shape returned by the API on a handled error (e.g. bad request) */
export interface ApiErrorResponse {
  error: string;
}


