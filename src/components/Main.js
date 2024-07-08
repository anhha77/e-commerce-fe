import Box from "@mui/material/Box";

import { useResponsive } from "../hooks/useResponsive";

import { NAV, HEADER } from "../app/configLayout";

import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ sx, ...other }) {
  const lgUp = useResponsive("up", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Outlet />
    </Box>
  );
}
