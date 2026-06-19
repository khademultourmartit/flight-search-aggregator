export interface Airport {
  code: string;
  city: string;
  name: string;
}

/**
 * Only DAC <-> DXB has mock flight data. JFK and LHR are included
 * deliberately so a user can search a route with no results and see
 * the empty state described in the assignment.
 */
export const AIRPORTS: Airport[] = [
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal Intl" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl" },
  { code: "LHR", city: "London", name: "Heathrow" },
];

export function getAirportLabel(code: string): string {
  const airport = AIRPORTS.find((a) => a.code === code);
  return airport ? `${airport.city} (${airport.code})` : code;
}
