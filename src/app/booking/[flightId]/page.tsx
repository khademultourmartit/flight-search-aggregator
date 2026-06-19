import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getFlightById } from "@/lib/flights";
import FlightSummaryCard from "@/components/FlightSummaryCard";
import BookingForm from "@/components/BookingForm";

interface BookingPageProps {
  params: { flightId: string };
  searchParams: { passengers?: string };
}

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const flight = await getFlightById(params.flightId);

  if (!flight) {
    notFound();
  }

  const passengerCount = Math.max(1, Number(searchParams.passengers) || 1);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        Review and book
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <FlightSummaryCard flight={flight} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <BookingForm flight={flight} passengerCount={passengerCount} />
        </Grid>
      </Grid>
    </Container>
  );
}
