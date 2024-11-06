import React from "react";
import Scrollbar from "../scrollbar";
import { Table, TableContainer } from "@mui/material";
import CateTableHead from "./CateTableHead";
import LoadingScreen from "../LoadingScreen";

function CateTableContent({
  isLoading,
  sortDirection,
  page,
  limit,
  emptyRows,
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
                headLabel={[
                  { id: "categoryName", label: "Category Name" },
                  { id: "image", label: "Image" },
                  { id: "" },
                ]}
              />
            </Table>
          )}
        </TableContainer>
      </Scrollbar>
    </>
  );
}

export default CateTableContent;
