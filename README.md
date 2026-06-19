# iBox Air — Flight Search Aggregator

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

| Requirement | Where |
|---|---|
| Search by origin, destination, date, passengers | `/` and `src/components/SearchForm.tsx` |
| Results list, sort, filter | `src/app/search/SearchResultsClient.tsx`, `FlightFilters.tsx` |
| Loading / empty / error states | `LoadingState.tsx`, `EmptyState.tsx`, `ErrorState.tsx` |
| Select flight → booking form → confirmation | `/booking/[flightId]`, `/confirmation` |
| Mock API | `src/app/api/flights/route.ts` (backed by `src/data/flights.json`) |
| TypeScript throughout | `src/types/flight.ts`, used in every component/route |
| Responsive | MUI breakpoints (`xs`/`sm`/`md`) throughout |
| Accessible | semantic landmarks, labelled inputs, `role="alert"`/`role="status"`, visible focus ring, keyboard-operable nav |
| State management | plain React Context (`BookingContext`) — see below |

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

**Two routes are deliberately "broken."** `JFK` and `LHR` are selectable in
the airport dropdowns but have no flights in the mock data, so picking
either origin or destination demonstrates the empty state without needing
a fake toggle. To see the error state, remove a required query param, e.g.
visit `/search?origin=DAC&destination=DXB&date=&passengers=1` directly.

**Why Material UI's classic `Grid`, not `Grid2`.** Pinned to MUI v5's
existing `Grid` API for stability within the exercise's time box, rather
than adopting the newer `Grid2` API, which would be the natural next
upgrade alongside a wider MUI v6 migration.

---

## Project structure

```
src/
  app/
    api/flights/route.ts        mock API: GET /api/flights
    booking/[flightId]/page.tsx booking page (server component)
    confirmation/page.tsx       confirmation page (reads BookingContext)
    search/                     search results page + Suspense shell
    layout.tsx, providers.tsx   root layout, MUI theme + context providers
    page.tsx                    homepage (hero + search + promo video)
  components/                   presentational + form components
  context/BookingContext.tsx    the app's one piece of shared state
  data/flights.json             ~30 mock flights, DAC → DXB
  lib/
    flights.ts                  data access (reads flights.json)
    theme.ts                    MUI theme
  types/flight.ts                shared TypeScript types
  utils/                         formatting + airport lookup helpers
scripts/generate_flights.py     one-off script used to generate flights.json
```

---

## The promotional video

`src/components/PromoVideo.tsx` embeds a real `<video>` element on the
homepage. It currently points at a public-domain placeholder clip (Big Buck
Bunny) since no real promotional footage was provided — swap the `src` in
that file for an actual video before shipping.

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

## What I'd do next

Given more time, in priority order:

1. **Tests.** Nothing here has automated test coverage. I'd add component
   tests (Vitest + React Testing Library) for the filtering/sorting logic
   and the booking form's validation, plus a couple of Playwright flows for
   search → select → book → confirm.
2. **A real price filter.** `FlightFiltersState.maxPrice` already exists in
   the data model but isn't wired to a UI control yet — a `Slider` bound to
   it is a small addition.
3. **Debounce/cancel in-flight requests** when a user changes the search
   form quickly (`AbortController` in `SearchResultsClient`), to avoid
   race conditions between overlapping fetches.
4. **Pagination or virtualization** once result sets grow well beyond ~30.
5. **Swap the mock API for a real backend** — `lib/flights.ts` is the only
   file that would need to change, since the route handler and the client
   already talk to it over HTTP.
6. **Replace the placeholder promo video** with real footage and a poster
   image.
