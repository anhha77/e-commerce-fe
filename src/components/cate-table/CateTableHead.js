import Checkbox from "@mui/material/Checkbox";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

function CateTableHead({
  order,
  headLabel,
  rowCount,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const onSort = (property) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || "left"}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={headCell.id === "categoryName"}
              sortDirection={headCell.id === "categoryName" ? order : false}
              onClick={() => {
                if (headCell.id === "categoryName") return onSort();
              }}
            />
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CateTableHead;
