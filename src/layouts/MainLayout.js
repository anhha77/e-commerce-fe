import React from "react";
import { Box, Stack } from "@mui/material";
import AlertMsg from "../components/AlertMsg";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />
      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}
