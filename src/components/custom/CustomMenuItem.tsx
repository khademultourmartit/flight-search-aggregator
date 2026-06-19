import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";

export const CustomMenuItem = styled(MenuItem)(({}) => ({
  backgroundColor: "transparent",
  borderRadius: "10px",
  fontWeight: 300,
  padding: "5px 8px",
  margin: "4px 10px",
  fontSize: "14px",
  fontFamily: "Public Sans",
  color: "#4b5563",
  "&:hover": {
    backgroundColor: "#F2F0F9 !important",
  },
  "&.Mui-selected": {
    backgroundColor: "#F2F0F9 !important",
  },
}));
