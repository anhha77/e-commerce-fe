import React from "react";
import Scrollbar from "../scrollbar";
import { Table, TableContainer } from "@mui/material";
import CateTableHead from "./CateTableHead";

function CateTableContent() {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: "unset", minHeight: 300 }}>
          <Table sx={{ minWidth: 800 }}>
            <CateTableHead
              headLabel={[
                { id: "categoryName", label: "Category Name" },
                { id: "image", label: "Image" },
                { id: "" },
              ]}
            />
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}

export default CateTableContent;
