import React from "react";
import Scrollbar from "../scrollbar";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CateTableHead from "./CateTableHead";
import LoadingScreen from "../LoadingScreen";
import CateTableRow from "./CateTableRow";
import TableEmptyRows from "../table/TableEmptyRows";
import TableNoData from "../table/TableNoData";

function CateTableContent({
  isLoading,
  categories,
  total,
  sortDirection,
  page,
  limit,
  emptyRows,
  handleSort,
  handleChangePage,
  handleChangeRowsPage,
  searchQuery,
  notFound,
}) {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: "unset", minHeight: 300 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Table sx={{ minWidth: 800 }}>
              <CateTableHead
                order={sortDirection === 1 ? "asc" : "desc"}
                onRequestSort={handleSort}
                headLabel={[
                  {
                    id: "categoryName",
                    label: "Category Name",
                  },
                  { id: "image", label: "Image" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {categories.map((category) => (
                  <CateTableRow
                    key={category._id}
                    category={category}
                    isLoading={isLoading}
                  />
                ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, limit, categories.length)}
                />

                {notFound && <TableNoData query={searchQuery} />}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Scrollbar>

      <TablePagination
        showFirstButton
        showLastButton
        page={page}
        component="div"
        count={total}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        onRowsPerPageChange={handleChangeRowsPage}
      />
    </>
  );
}

export default CateTableContent;
