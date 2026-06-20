import { Box, Paper, Skeleton, Stack, Divider } from "@mui/material";

export default function LoadingState() {
  return (
    <Box role="status" aria-live="polite" aria-label="Searching flights">
      <Stack spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 2,
              overflow: "hidden",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important",
            }}
          >
            {/* Top Row */}
            <Stack direction="row" spacing={2}>
              {/* Airline */}
              <Box width={180}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={32} height={32} />
                  <Box flex={1}>
                    <Skeleton width="90%" height={22} />
                    <Skeleton width="50%" height={18} />
                  </Box>
                </Stack>
              </Box>

              {/* Departure */}
              <Box width={130}>
                <Skeleton width={70} height={40} />
                <Skeleton width={90} height={20} />
              </Box>

              {/* Timeline */}
              <Box flex={1}>
                <Skeleton width="100%" height={60} />
              </Box>

              {/* Arrival */}
              <Box width={130}>
                <Skeleton width={70} height={40} />
                <Skeleton width={90} height={20} />
              </Box>

              {/* Price & Button */}
              <Box
                sx={{
                  width: 180,
                  bgcolor: "#faf7f8",
                  p: 1.5,
                  borderRadius: 1,
                }}
              >
                <Skeleton width={100} height={35} sx={{ mx: "auto" }} />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={42}
                  sx={{ mt: 2, borderRadius: 1 }}
                />
              </Box>
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            {/* Bottom Row */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={3}>
                <Skeleton width={60} height={20} />
                <Skeleton width={60} height={20} />
              </Stack>

              <Stack direction="row" spacing={4}>
                <Skeleton width={120} height={20} />
                <Skeleton width={100} height={20} />
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
