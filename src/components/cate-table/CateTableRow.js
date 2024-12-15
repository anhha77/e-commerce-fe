import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Iconify from "../Iconify";

function CateTableRow({ category }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const RenderCategory = ({ category }) => (
    <>
      {category.parentCategoryId && (
        <>
          <RenderCategory category={category.parentCategoryId} />
          {" > "}
        </>
      )}
      {category.categoryName}
    </>
  );

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row">
          <Typography
            variant="subtitle2"
            component={RouterLink}
            to={`/admin/categories/${category._id}`}
            sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.text.primary,
            }}
            noWrap
          >
            <RenderCategory category={category} />
          </Typography>
        </TableCell>

        <TableCell>
          <Box>
            <img
              src="/assets/new_images/No_Image_Available.jpg"
              alt="default_image"
              height={50}
              width={50}
            />
          </Box>
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
        <MenuItem onClick={() => navigate(`/admin/categories/${category._id}`)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default CateTableRow;
