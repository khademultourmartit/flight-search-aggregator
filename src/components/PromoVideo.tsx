"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

/**
 * Big Buck Bunny is a public-domain (CC) short film commonly used as a
 * placeholder media asset. Swap `src` for a real promotional video
 * before shipping - see the README for where this lives.
 */
const PLACEHOLDER_VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function PromoVideo() {
  return (
    <Box component="section" aria-labelledby="promo-video-heading" sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
      <Container maxWidth="md">
        <Typography
          id="promo-video-heading"
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 1 }}
        >
          See iBox Air in action
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          A quick look at searching, comparing, and booking a flight.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            overflow: "hidden",
            borderRadius: 2,
            aspectRatio: "16 / 9",
          }}
        >
          <Box
            component="video"
            controls
            preload="metadata"
            aria-label="Promotional video showing the flight search and booking flow"
            sx={{ width: "100%", height: "100%", display: "block", bgcolor: "#000" }}
          >
            <source src={PLACEHOLDER_VIDEO_SRC} type="video/mp4" />
            Your browser does not support embedded video.
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
