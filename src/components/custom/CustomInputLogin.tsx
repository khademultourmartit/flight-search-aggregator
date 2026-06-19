import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomInputLogin = styled(TextField)(({}) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    backgroundColor: "#F2F0F9",
    color: "#413755",
    boxSizing: "border-box",
    transition: "all 0.3s ease-in-out",
    fontFamily: "Public Sans",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6e6996",
    },
    "&:hover fieldset": {
      borderColor: "#4f47e6",
    },
    "&.Mui-focused": {
      backgroundColor: "#F2F0F9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4f47e6",
    },
  },
  "& .MuiInputBase-input": {
    fontWeight: 500,
  },
  "& .MuiInputBase-input:focus": {
    fontWeight: 500,
  },
  "& .MuiInputLabel-root": {
    color: "#6e6996",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#a56eb4",
  },
}));
