import { Box } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { usePathname } from "../hooks/usePathname";
import { useNavigate } from "react-router-dom";

function UserLogo({ isAdmin, handleAction, sx }) {
  const userLogo = (
    <Box sx={{ width: 40, height: 40, ...sx }} onClick={handleAction}>
      {isAdmin ? (
        <SupervisorAccountIcon sx={{ width: "100%", height: "50%" }} />
      ) : (
        <PersonIcon sx={{ width: "100%", height: "50%" }} />
      )}
    </Box>
  );
  return <>{userLogo}</>;
}

export default UserLogo;
