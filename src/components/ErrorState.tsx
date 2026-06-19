import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Box
      role="alert"
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 56, mb: 2 }} />
      <Typography variant="h6" component="p" sx={{ mb: 1 }}>
        We couldn&apos;t load flights
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        Try again
      </Button>
    </Box>
  );
}
