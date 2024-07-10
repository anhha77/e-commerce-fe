import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

function UserPopover({ anchorEl, setIsAdmin, handleClose }) {
  const navigate = useNavigate();
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsAdmin(false);
              navigate("/login");
              handleClose();
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Login" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsAdmin(true);
              navigate("/login/admin");
              handleClose();
            }}
          >
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
}

export default UserPopover;
