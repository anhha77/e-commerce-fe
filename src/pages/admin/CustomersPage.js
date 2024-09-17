import { useEffect, useState } from "react";
import lodash from "lodash";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

import Iconify from "../../components/Iconify";

import UserTableToolbar from "../../components/table/UserTableToolbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "../../features/customerSlice";

import { useNavigate } from "react-router-dom";
import UserStatusNav from "../../components/table/UserStatusNav";
import { Divider } from "@mui/material";
import TableContent from "../../components/table/TableContent";

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

  const [selectedDeleted, setSelectedDeleted] = useState([]);

  const [currentTab, setCurrentTab] = useState("all");

  const emptyRows = (page, rowsPerPage, arrayLength) => {
    return page ? Math.max(0, rowsPerPage - arrayLength) : 0;
  };

  const {
    isLoading,
    currentPageCustomers,
    customersById,
    totalCustomers,
    currentPageActiveCustomers,
    activeCustomersById,
    totalActiveCustomers,
    currentPageDeletedCustomers,
    deletedCustomersById,
    totalDeletedCustomers,
  } = useSelector((state) => state.customer);
  const customers = currentPageCustomers.map(
    (customerId) => customersById[customerId]
  );

  const activeCustomers = currentPageActiveCustomers.map(
    (activeCustomerId) => activeCustomersById[activeCustomerId]
  );

  const deletedCustomers = currentPageDeletedCustomers.map(
    (deletedCustomerId) => deletedCustomersById[deletedCustomerId]
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

  const handleSelectDeletedAllClick = (event) => {
    setSelectedDeleted([]);
  };

  const handleClickDeleted = (event, username) => {
    const selectedDeletedIndex = selectedDeleted.indexOf(username);
    let newSelectedDeleted = [];
    if (selectedDeletedIndex === -1) {
      newSelectedDeleted = newSelectedDeleted.concat(selectedDeleted, username);
    } else if (selectedDeletedIndex === 0) {
      newSelectedDeleted = newSelectedDeleted.concat(selectedDeleted.slice(1));
    } else if (selectedDeletedIndex === selectedDeleted.length - 1) {
      newSelectedDeleted = newSelectedDeleted.concat(
        selectedDeleted.slice(0, -1)
      );
    } else if (selectedDeletedIndex > 0) {
      newSelectedDeleted = newSelectedDeleted.concat(
        selectedDeleted.slice(0, selectedDeletedIndex),
        selectedDeleted.slice(selectedDeletedIndex + 1)
      );
    }
    setSelectedDeleted(newSelectedDeleted);
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

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer({ id })).then(() =>
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
      )
    );
  };

  const notFound = !customers.length && !!searchQuery;

  const notFoundActive = !activeCustomers.length && !!searchQuery;

  const notFoundDeleted = !deletedCustomers.length && !!searchQuery;

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
        <UserStatusNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <Divider />

        {currentTab === "all" ? (
          <>
            <UserTableToolbar
              numSelected={0}
              searchQuery={searchQuery}
              onSearchQuery={handleSearchQuery}
              usernameSearch={usernameSearch}
              emailSearch={emailSearch}
              phoneNumberSearch={phoneNumberSearch}
              setUsernameSearch={setUsernameSearch}
              setEmailSearch={setEmailSearch}
              setPhoneNumberSearch={setPhoneNumberSearch}
            />
            <TableContent
              isLoading={isLoading}
              sortDirection={sortDirection}
              orderBy={orderBy}
              totalCustomers={totalCustomers}
              customers={customers}
              selected={[]}
              handleSort={handleSort}
              handleSelectAllClick={null}
              handleClick={null}
              emptyRows={emptyRows}
              page={page}
              limit={limit}
              notFound={notFound}
              searchQuery={searchQuery}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              tabStatus="all"
              handleDelete={handleDeleteCustomer}
            />
          </>
        ) : currentTab === "active" ? (
          <>
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
            <TableContent
              isLoading={isLoading}
              sortDirection={sortDirection}
              orderBy={orderBy}
              totalCustomers={totalActiveCustomers}
              customers={activeCustomers}
              selected={selected}
              handleSort={handleSort}
              handleSelectAllClick={handleSelectAllClick}
              handleClick={handleClick}
              emptyRows={emptyRows}
              page={page}
              limit={limit}
              notFound={notFoundActive}
              searchQuery={searchQuery}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              tabStatus="active"
              handleDelete={handleDeleteCustomer}
            />
          </>
        ) : (
          <>
            <UserTableToolbar
              numSelected={selectedDeleted.length}
              searchQuery={searchQuery}
              onSearchQuery={handleSearchQuery}
              usernameSearch={usernameSearch}
              emailSearch={emailSearch}
              phoneNumberSearch={phoneNumberSearch}
              setUsernameSearch={setUsernameSearch}
              setEmailSearch={setEmailSearch}
              setPhoneNumberSearch={setPhoneNumberSearch}
            />
            <TableContent
              isLoading={isLoading}
              sortDirection={sortDirection}
              orderBy={orderBy}
              totalCustomers={totalDeletedCustomers}
              customers={deletedCustomers}
              selected={selectedDeleted}
              handleSort={handleSort}
              handleSelectAllClick={handleSelectDeletedAllClick}
              handleClick={handleClickDeleted}
              emptyRows={emptyRows}
              page={page}
              limit={limit}
              notFound={notFoundDeleted}
              searchQuery={searchQuery}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              tabStatus="deleted"
              handleDelete={handleDeleteCustomer}
            />
          </>
        )}
      </Card>
    </Container>
  );
}
