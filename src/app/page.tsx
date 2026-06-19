import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchForm from "@/components/FlightSearchBox";
import PromoVideo from "@/components/PromoVideo";

export default function HomePage() {
  return (
    <Box mt={2}>
      <Container maxWidth="lg"></Container>

      <Container maxWidth="xl">
        <SearchForm />
      </Container>

      {/* <PromoVideo /> */}
    </Box>
  );
}
