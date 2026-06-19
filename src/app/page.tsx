import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchForm from "@/components/SearchForm";
import PromoVideo from "@/components/PromoVideo";

export default function HomePage() {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: "primary.main",
          color: "common.white",
          py: { xs: 6, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Find your next flight
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 560 }}>
            Compare fares across airlines and book in a few simple steps.
          </Typography>

          <SearchForm />
        </Container>
      </Box>

      <PromoVideo />
    </>
  );
}
