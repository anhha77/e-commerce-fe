import { Box } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

function UserLogo({ isAdmin, handleAction, sx }) {
  const userLogo = (
    <Box sx={{ width: 40, height: 40, ...sx }} onClick={handleAction}>
      {isAdmin ? (
        <SupervisedUserCircleIcon sx={{ width: "100%", height: "50%" }} />
      ) : (
        <AccountCircleIcon sx={{ width: "100%", height: "50%" }} />
      )}
    </Box>
  );
  return <>{userLogo}</>;
}

export default UserLogo;
