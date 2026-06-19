import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "common.white",
        mt: "auto",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              iBox Air
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              A demo flight search and booking experience.
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} component="nav" aria-label="Footer">
            <Link href="/" style={{ color: "inherit", opacity: 0.85 }}>
              Home
            </Link>
            <Link
              href="/search?origin=DAC&destination=DXB&date=2026-06-19&passengers=1"
              style={{ color: "inherit", opacity: 0.85 }}
            >
              Search
            </Link>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          sx={{ opacity: 0.6, mt: 3, textAlign: { xs: "left", sm: "center" } }}
        >
          © {year} iBox Air. Built for the iBox Lab frontend take-home exercise.
        </Typography>
      </Container>
    </Box>
  );
}
