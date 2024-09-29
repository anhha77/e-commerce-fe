import React from "react";
import Scrollbar from "../scrollbar";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import LoadingScreen from "../LoadingScreen";
import UserTableHead from "./UserTableHead";
import UserTableRow from "./UserTableRow";
import TableEmptyRows from "./TableEmptyRows";
import TableNoData from "./TableNoData";

function TableContent({
  isLoading,
  sortDirection,
  orderBy,
  totalCustomers,
  customers,
  selected,
  handleSort,
  handleSelectAllClick,
  handleClick,
  emptyRows,
  page,
  limit,
  notFound,
  searchQuery,
  handleChangePage,
  handleChangeRowsPerPage,
  tabStatus,
  handleDelete,
  handleRestore,
  handleDeletePernament,
}) {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: "unset", minHeight: 300 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={sortDirection === 1 ? "asc" : "desc"}
                orderBy={orderBy}
                rowCount={totalCustomers}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "username", label: "Userame" },
                  { id: "email", label: "Email" },
                  { id: "phoneNumber", label: "Phone Number" },
                  { id: "role", label: "Role" },
                  { id: "createdAt", label: "Created At" },
                  { id: "status", label: "Status" },
                  { id: "" },
                ]}
                tabStatus={tabStatus}
              />
              <TableBody>
                {customers.map((row) => (
                  <UserTableRow
                    key={row._id}
                    id={row._id}
                    username={row.username}
                    email={row.email}
                    phoneNumber={row.phoneNumber}
                    role={row.role}
                    createdAt={row.createdAt}
                    tabStatus={tabStatus}
                    status={row.isDeleted}
                    avatarUrl={row.avatarUrl}
                    selected={selected.indexOf(row._id) !== -1}
                    handleClick={(event) => handleClick(event, row._id)}
                    handleDelete={handleDelete}
                    handleRestore={handleRestore}
                    handleDeletePernament={handleDeletePernament}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, limit, customers.length)}
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
        count={totalCustomers ? totalCustomers : 0}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default TableContent;
