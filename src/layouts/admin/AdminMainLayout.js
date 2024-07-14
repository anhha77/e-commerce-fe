import { useState } from "react";

import Box from "@mui/material/Box";

import AdminNav from "../../components/admin/AdminNav";
import Main from "../../components/Main";
import Header from "../../components/Header";

// ----------------------------------------------------------------------

export default function AdminMainLayout() {
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
        <AdminNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main />
      </Box>
    </>
  );
}
