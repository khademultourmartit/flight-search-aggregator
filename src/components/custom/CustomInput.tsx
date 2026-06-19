import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomInput = styled(TextField)(({}) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    height: "40px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#413755",
    padding: "0 0px",
    boxSizing: "border-box",
    transition: "all 0.3s ease-in-out",
    fontFamily: "Public Sans",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EAE8F4",
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
    "&.Mui-error fieldset": {
      borderColor: "#FF7D95",
    },
  },
  "& .MuiInputBase-input": {
    fontWeight: 500,
  },
  "& .MuiInputBase-input:focus": {
    fontWeight: 500,
  },
  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    color: "red",
    fontFamily: "Public Sans",
  },
}));
