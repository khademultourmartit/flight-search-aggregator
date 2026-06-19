import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FlightLandIcon from "@mui/icons-material/FlightLand";

interface EmptyStateProps {
  origin: string;
  destination: string;
  date: string;
}

export default function EmptyState({ origin, destination, date }: EmptyStateProps) {
  return (
    <Box
      role="status"
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
        color: "text.secondary",
      }}
    >
      <FlightLandIcon sx={{ fontSize: 56, mb: 2, opacity: 0.5 }} />
      <Typography variant="h6" component="p" sx={{ mb: 1 }}>
        No flights found from {origin} to {destination} on {date}
      </Typography>
      <Typography variant="body2">
        Try a different date, or search a different route. DAC → DXB has the
        most availability in this demo.
      </Typography>
    </Box>
  );
}
