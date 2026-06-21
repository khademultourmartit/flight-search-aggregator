# Flight Search Aggregator

A flight search and booking demo built for the iBox Lab frontend take-home
exercise: search for flights, filter and sort results, select a flight, and
complete a simple booking flow.

**Stack:** Next.js (App Router) · TypeScript · Material UI · React Context
(no external state library)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default search on
the homepage (Dhaka → Dubai, 19 Jun 2026) is pre-filled with a route that has
mock data.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

No environment variables or backend setup are required — everything runs
off a local `flights.json` file served through a real (if mock) API route.

---

## What's included

| Requirement                                     | Where                                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Search by origin, destination, date, passengers | `/` and `src/components/SearchForm.tsx`                                                                        |
| Results list, sort, filter                      | `src/app/search/SearchResultsClient.tsx`, `FlightFilters.tsx`                                                  |
| Loading / empty / error states                  | `LoadingState.tsx`, `EmptyState.tsx`, `ErrorState.tsx`                                                         |
| Select flight → booking form → confirmation     | `/booking/[flightId]`, `/confirmation`                                                                         |
| Mock API                                        | `src/app/api/flights/route.ts` (backed by `src/data/flights.json`)                                             |
| TypeScript throughout                           | `src/types/flight.ts`, used in every component/route                                                           |
| Responsive                                      | MUI breakpoints (`xs`/`sm`/`md`) throughout                                                                    |
| Accessible                                      | semantic landmarks, labelled inputs, `role="alert"`/`role="status"`, visible focus ring, keyboard-operable nav |
| State management                                | plain React Context (`BookingContext`) — see below                                                             |

---

---

### 🔎 Flight Search System

Search flights by:

- Origin
- Destination
- Departure date
- Number of passengers

### 🌍 Supported Destinations

The system currently supports the following routes:

- DAC → DXB (Dhaka → Dubai)
- DAC → BKK (Dhaka → Bangkok)
- DAC → SPD (Saidpur Airport)
- DAC → CXB (Cox’s Bazar)

These destinations are used across:

- Search form
- Popular destination slider
- Quick search shortcuts

---

## Architecture decisions & trade-offs

**Mock API as a real route handler, not a JSON import.**
`flights.json` lives in `src/data`, but the client never imports it
directly. Instead, `src/lib/flights.ts` reads it server-side, and
`src/app/api/flights/route.ts` exposes it over HTTP with real query-param
validation (400 on missing/invalid params) and an artificial ~600ms delay.
This means the search page's loading/empty/error handling is exercising a
genuine `fetch` against a genuine endpoint, not a simulated `setTimeout` in
the component — closer to how this would behave against a real backend,
and the API layer is a clean swap-in point later.

**State management: React Context, not Redux/Zustand.**
The brief explicitly didn't ask for a state library, and the app's shared
state is small: which flight is selected and the resulting booking. That
lives in `BookingContext` (a single provider, hydrated from
`sessionStorage` so a confirmation-page refresh doesn't lose the booking).
Everything else — search inputs, filters, sort order, request status — is
local `useState` scoped to the page that owns it, passed via URL query
params where it needs to survive navigation (e.g. revisiting `/search` with
the same filters via a shared link). This keeps each piece of state owned
by the component that actually needs it, rather than centralizing
everything by default.

**Search params live in the URL, not in memory.**
`/search?origin=DAC&destination=DXB&date=2026-06-19&passengers=1` is
shareable, back-button-friendly, and is the natural "source of truth" for a
search results page. `useSearchParams` requires a `Suspense` boundary in
the App Router, so `app/search/page.tsx` is a thin server component that
just sets up `<Suspense>`, and the actual fetching/filtering logic lives in
`SearchResultsClient.tsx`.

**Server components by default, client components where there's
interactivity.** The booking page (`booking/[flightId]/page.tsx`) is a
server component that fetches the flight directly via `lib/flights.ts` —
no need for it to round-trip through its own API route. Only the form
itself (`BookingForm.tsx`) is a client component, since it needs state and
event handlers.

**Passenger count actually filters results.** Each mock flight has a
`seatsAvailable` count; searching for more passengers than a flight has
seats removes it from the results. This was a deliberate small touch so
the passenger field isn't purely decorative.

---

## Accessibility notes

- Header, main, and footer are real `<header>`/`<main>`/`<footer>` landmarks.
- All form fields use associated labels (MUI `TextField`/`label` pairing).
- Filter groups use `RadioGroup`/`FormGroup` with `aria-label`s, not bare divs.
- Loading state has `role="status"`/`aria-live="polite"`; error state has
  `role="alert"`.
- Focus is visible (`:focus-visible` outline in `globals.css`), and
  `prefers-reduced-motion` is respected.
- Mobile nav is a real `Drawer` (focus-trapped, closable via `Esc`), not a
  custom dropdown.

What's not done: no automated accessibility audit (e.g. axe) was run —
listed under "next steps" below.

---
