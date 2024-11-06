import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../../components/Iconify";
import { useNavigate } from "react-router-dom";
import CateTableToolbar from "../../components/cate-table/CateTableToolbar";
import CateTableContent from "../../components/cate-table/CateTableContent";

function CategoryPage() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(5);

  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortDirection, setSortDirection] = useState(1);

  const emptyRows = (page, rowsPerPage, arrayLength) => {
    return page ? Math.max(0, rowsPerPage - arrayLength) : 0;
  };

  const handleSelectAllClick = (event) => {
    setSelected([]);
  };

  const handleClick = (event, categoryId) => {
    const selectedIndex = selected.indexOf(categoryId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, categoryId);
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

  const handleSort = () => {
    if (sortDirection === -1) {
      setSortDirection(1);
    } else {
      setSortDirection(-1);
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Categories</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/admin/create_category")}
        >
          New Category
        </Button>
      </Stack>

      <Card>
        <CateTableToolbar
          numSelected={selected}
          searchQuery={searchQuery}
          onSearchQuery={handleSearchQuery}
        />
        <CateTableContent />
      </Card>
    </Container>
  );
}

export default CategoryPage;
