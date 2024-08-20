import { useEffect, useState } from "react";
import lodash from "lodash";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/scrollbar";

import TableNoData from "../../components/table/TableNoData";
import UserTableRow from "../../components/table/UserTableRow";
import UserTableHead from "../../components/table/UserTableHead";
import TableEmptyRows from "../../components/table/TableEmptyRows";
import UserTableToolbar from "../../components/table/UserTableToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../features/customerSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function CustomersPage() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(5);

  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [usernameSearch, setUsernameSearch] = useState(true);

  const [emailSearch, setEmailSearch] = useState(true);

  const [phoneNumberSearch, setPhoneNumberSearch] = useState(true);

  const [orderBy, setOrderBy] = useState("username");

  const [sortDirection, setSortDirection] = useState(-1);

  const [selected, setSelected] = useState([]);

  const emptyRows = (page, rowsPerPage, arrayLength) => {
    return page ? Math.max(0, rowsPerPage - arrayLength) : 0;
  };

  const {
    isLoading,
    currentPageCustomers,
    customersById,
    totalCustomers,
    totalPages,
  } = useSelector((state) => state.customer);
  const customers = currentPageCustomers.map(
    (customerId) => customersById[customerId]
  );

  const dispatch = useDispatch();

  const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = customers.map((n) => n.username);
    //   setSelected(newSelecteds);
    //   return;
    // }
    setSelected([]);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleSearchQuery = (event) => {
    setPage(0);
    setSearchQuery(event.target.value);
  };

  const handleSort = (field) => {
    if (sortDirection === -1) {
      setSortDirection(1);
      setOrderBy(field);
    } else {
      setSortDirection(-1);
      setOrderBy(field);
    }
  };

  const notFound = !customers.length && !!searchQuery;

  useEffect(() => {
    const callAPI = lodash.debounce(
      () =>
        dispatch(
          getCustomers({
            page,
            limit,
            searchQuery,
            usernameSearch,
            emailSearch,
            phoneNumberSearch,
            orderBy,
            sortDirection,
          })
        ),
      200
    );
    callAPI();
  }, [
    dispatch,
    limit,
    page,
    searchQuery,
    usernameSearch,
    emailSearch,
    phoneNumberSearch,
    orderBy,
    sortDirection,
  ]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/admin/create_user")}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          searchQuery={searchQuery}
          onSearchQuery={handleSearchQuery}
          usernameSearch={usernameSearch}
          emailSearch={emailSearch}
          phoneNumberSearch={phoneNumberSearch}
          setUsernameSearch={setUsernameSearch}
          setEmailSearch={setEmailSearch}
          setPhoneNumberSearch={setPhoneNumberSearch}
        />

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
                      status={"active"}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.username) !== -1}
                      handleClick={(event) => handleClick(event, row.username)}
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
      </Card>
    </Container>
  );
}
