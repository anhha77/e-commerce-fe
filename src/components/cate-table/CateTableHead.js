import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import { visuallyHidden } from "../table/utils";

function CateTableHead({ order, headLabel, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || "left"}
            sortDirection={headCell.id === "categoryName" ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={headCell.id === "categoryName"}
              direction={headCell.id === "categoryName" ? order : "asc"}
              onClick={() => {
                if (headCell.id === "categoryName") return onRequestSort();
              }}
            >
              {headCell.label}
              {headCell.id === "categoryName" ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CateTableHead;
