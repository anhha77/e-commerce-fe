import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddressDialog from "./AddressDialog";

function CardAddress({ item, index }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card key={item.phoneNumber}>
      <CardHeader
        title={
          <Box>
            {item.country}
            {item.isDefault ? (
              <Chip
                label="Default"
                sx={{
                  marginLeft: "10px",
                  backgroundColor: (theme) => theme.palette.info.lighter,
                  color: (theme) => theme.palette.info.dark,
                  borderRadius: "5px",
                  px: "3px",
                  height: "24px",
                  fontSize: "0.75rem",
                }}
              />
            ) : null}
          </Box>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          variant: "h6",
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ width: 200, maxWidth: "100%" }}>
          <MenuList onClick={handleClose}>
            <MenuItem>
              <Stack direction="row" justifyContent="space-between">
                <ListItemIcon>
                  <StarIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Set as default</ListItemText>
              </Stack>
            </MenuItem>
          </MenuList>

          <MenuList onClick={handleOpenDialog}>
            <MenuItem>
              <Stack direction="row" justifyContent="space-between">
                <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </Stack>
            </MenuItem>
          </MenuList>

          <MenuList onClick={handleClose}>
            <MenuItem>
              <Stack direction="row" justifyContent="space-between">
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: (theme) => theme.palette.error.main,
                  }}
                >
                  Delete
                </ListItemText>
              </Stack>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>

      <CardContent>
        <Stack spacing={1}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            noWrap
          >
            {item.addressLocation}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            noWrap
          >
            {item.phoneNumber}
          </Typography>
        </Stack>
      </CardContent>
      <AddressDialog open={open} item={item} handleClose={handleCloseDialog} />
    </Card>
  );
}

export default CardAddress;
