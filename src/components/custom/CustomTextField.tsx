import React from "react";
import { TextField } from "@mui/material";
import "../../scss/custom/custom.scss";

const CustomTextField = (props: any) => {
  return <TextField {...props} className="custom-textfield" />;
};

export default CustomTextField;
