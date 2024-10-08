import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Label from "../label";
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  username,
  email,
  phoneNumber,
  role,
  createdAt,
  tabStatus,
  status,
  avatarUrl,
  selected,
  handleClick,
  handleDelete,
  handleRestore,
  handleDeletePernament,
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleNavigateEdit = () => {
    navigate(`/admin/users/${id}`);
    setOpen(null);
  };

  const handleDeleteCustomer = () => {
    handleDelete(id);
    setOpen(null);
  };

  const handleRestoreCustomer = () => {
    handleRestore(id);
    setOpen(null);
  };

  const handleDeletePernamentCustomer = () => {
    handleDeletePernament(id);
    setOpen(null);
  };

  let date = new Date(createdAt);

  const tabelRowWithCheckbox = (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} src={avatarUrl} />
            <Typography
              variant="subtitle2"
              component={RouterLink}
              to={`/admin/users/${id}`}
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.text.primary,
              }}
              noWrap
            >
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell>{role.charAt(0).toUpperCase() + role.slice(1)}</TableCell>

        <TableCell>
          {date.toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </TableCell>

        <TableCell>
          <Label color={status ? "error" : "success"}>
            {status ? "Deleted" : "Active"}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {status ? (
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: { width: 200 },
            }}
          >
            <MenuItem onClick={handleRestoreCustomer}>
              <Iconify icon="carbon:reset" sx={{ mr: 2 }} />
              Restore
            </MenuItem>

            <MenuItem
              onClick={handleDeletePernamentCustomer}
              sx={{ color: "error.main" }}
            >
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete Pernamently
            </MenuItem>
          </Popover>
        ) : (
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            <MenuItem onClick={handleNavigateEdit}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem
              onClick={handleDeleteCustomer}
              sx={{ color: "error.main" }}
            >
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        )}
      </Popover>
    </>
  );

  const tableRowWithoutCheckbox = (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} src={avatarUrl} />
            <Typography
              variant="subtitle2"
              component={RouterLink}
              to={`/admin/users/${id}`}
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.text.primary,
              }}
              noWrap
            >
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell>{role.charAt(0).toUpperCase() + role.slice(1)}</TableCell>

        <TableCell>
          {date.toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </TableCell>

        <TableCell>
          <Label color={status ? "error" : "success"}>
            {status ? "Deleted" : "Active"}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {status ? (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 200 },
          }}
        >
          <MenuItem onClick={handleRestoreCustomer}>
            <Iconify icon="carbon:reset" sx={{ mr: 2 }} />
            Restore
          </MenuItem>

          <MenuItem
            onClick={handleDeletePernamentCustomer}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete Pernamently
          </MenuItem>
        </Popover>
      ) : (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleNavigateEdit}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDeleteCustomer} sx={{ color: "error.main" }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      )}
    </>
  );

  return (
    <>{tabStatus === "all" ? tableRowWithoutCheckbox : tabelRowWithCheckbox}</>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.bool,
};
