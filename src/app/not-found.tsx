import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "radial-gradient(circle at top, #eef2ff, #ffffff)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          {/* Big 404 */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: "5rem",
              lineHeight: 1,
              background: "linear-gradient(90deg, #6366f1, #22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            404
          </Typography>

          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Page not found
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 420, mx: "auto" }}
          >
            We couldn’t find what you were looking for. The page may have moved,
            been deleted, or the link might be incorrect.
          </Typography>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{
                px: 3,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                // boxShadow: "0 10px 25px rgba(99,102,241,0.3)",
              }}
            >
              Back to home
            </Button>

            <Button
              component={Link}
              href="javascript:history.back()"
              variant="outlined"
              sx={{
                px: 3,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Go back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
