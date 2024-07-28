import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Iconify from "../Iconify";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Popover,
} from "@mui/material";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  numSelected,
  searchQuery,
  onSearchQuery,
  usernameSearch,
  emailSearch,
  phoneNumberSearch,
  setUsernameSearch,
  setEmailSearch,
  setPhoneNumberSearch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const FilterPopUp = (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Container>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={usernameSearch}
                onChange={(event) =>
                  setUsernameSearch(event.currentTarget.checked)
                }
                disabled={!emailSearch && !phoneNumberSearch ? true : false}
              />
            }
            label="Username"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={emailSearch}
                onChange={(event) =>
                  setEmailSearch(event.currentTarget.checked)
                }
                disabled={!usernameSearch && !phoneNumberSearch ? true : false}
              />
            }
            label="Email"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={phoneNumberSearch}
                onChange={(event) =>
                  setPhoneNumberSearch(event.currentTarget.checked)
                }
                disabled={!usernameSearch && !emailSearch ? true : false}
              />
            }
            label="Phone Number"
          />
        </FormGroup>
      </Container>
    </Popover>
  );

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={searchQuery}
          onChange={onSearchQuery}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Search By">
            <IconButton onClick={handleClick}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
          {FilterPopUp}
        </>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  searchQuery: PropTypes.string,
  onSearchQuery: PropTypes.func,
};
