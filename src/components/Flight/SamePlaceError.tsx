import { Alert, Stack } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SamePlaceError = () => {
  return (
    <>
      <Stack
        style={{
          position: "absolute",
          top: "35%",
          left: "0",
          width: "90%",
        }}
      >
        <Alert
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="error"
          sx={{ fontSize: "11px" }}
        >
          Cannot choose same place!
        </Alert>
      </Stack>
    </>
  );
};

export default SamePlaceError;
