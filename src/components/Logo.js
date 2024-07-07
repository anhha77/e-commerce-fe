import { Box } from "@mui/material";
import React from "react";
import shoplogo from "../logo.jpg";
import { Link } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={shoplogo} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }
  return <Link to="/">{logo}</Link>;
}

export default Logo;
