import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We couldn&apos;t find what you were looking for. The flight may no
        longer be available, or the link may be incorrect.
      </Typography>
      <Box>
        <Button component={Link} href="/" variant="contained">
          Back to home
        </Button>
      </Box>
    </Container>
  );
}
