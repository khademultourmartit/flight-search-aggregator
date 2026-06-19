import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";

export const CustomMenuItem = styled(MenuItem)(({}) => ({
  fontWeight: 500,
  fontSize: "13px",
  margin: "4px 10px",
  padding: "5px 8px",
  color: "#4E555B",
  borderRadius: "0px",
  fontFamily: "Poppins",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "#fcf3f8 !important",
  },
  "&.Mui-selected": {
    backgroundColor: "#fcf3f8 !important",
  },
}));
