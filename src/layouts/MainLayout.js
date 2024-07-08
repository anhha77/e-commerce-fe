import { useState } from "react";

import Box from "@mui/material/Box";

import Nav from "../components/Nav";
import Main from "../components/Main";
import Header from "../components/Header";

// ----------------------------------------------------------------------

export default function MainLayout() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main />
      </Box>
    </>
  );
}
