import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getFlightById } from "@/lib/flights";
import FlightSummaryCard from "@/components/FlightSummaryCard";
import BookingForm from "@/components/BookingForm";
import "../../../scss/flight-booking/flight-booking.scss";

interface BookingPageProps {
  params: { flightId: string };
  searchParams: {
    passengers?: number;
    adt?: number;
    chd?: number;
    inf?: number;
  };
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const flight = await getFlightById(params.flightId);

  if (!flight) {
    notFound();
  }

  const passengerCount = Math.max(1, Number(searchParams.passengers) || 1);

  const adt = Number(searchParams.adt) || 1;
  const chd = Number(searchParams.chd) || 0;
  const inf = Number(searchParams.inf) || 0;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography className="booking-review-title" mb={3}>
        Review and book
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <FlightSummaryCard flight={flight} passengerCount={passengerCount} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <BookingForm
            flight={flight}
            passengerCount={passengerCount}
            adt={adt}
            chd={chd}
            inf={inf}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
