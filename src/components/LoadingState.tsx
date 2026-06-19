import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function LoadingState() {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label="Searching for flights"
    >
      <Stack spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Paper key={index} sx={{ p: 2, borderRadius: 2 }} elevation={1}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Skeleton variant="text" width="40%" height={28} />
                <Skeleton variant="text" width="60%" />
              </Box>
              <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
