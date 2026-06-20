import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchForm from "@/components/FlightSearchBox";

import HomeService from "@/components/LandingPage/HomeService";
import TrustedAirline from "@/components/LandingPage/TrustedAirline";

export default function HomePage() {
  return (
    <Box mt={2}>
      <Container maxWidth="lg"></Container>

      <Container maxWidth="xl">
        <Box>
          <SearchForm />
        </Box>

        <Box mt={5}>
          <HomeService />
        </Box>

        <Box mt={5}>
          <TrustedAirline />
        </Box>
      </Container>
    </Box>
  );
}
