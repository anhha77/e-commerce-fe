import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../components/Iconify";
import { useNavigate } from "react-router-dom";
import CateTableToolbar from "../../components/cate-table/CateTableToolbar";
import CateTableContent from "../../components/cate-table/CateTableContent";
import lodash from "lodash";
import { getCategories } from "../../features/categorySlice";
import { useDispatch, useSelector } from "react-redux";

function CategoryPage() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(5);

  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortDirection, setSortDirection] = useState(1);

  const dispatch = useDispatch();

  const emptyRows = (page, rowsPerPage, arrayLength) => {
    return page ? Math.max(0, rowsPerPage - arrayLength) : 0;
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

  useEffect(() => {
    const callAPI = lodash.debounce(
      () =>
        dispatch(
          getCategories({
            page,
            limit,
            categoryName: searchQuery,
            sortDirection,
          })
        ),
      200
    );
    callAPI();
  }, [dispatch, page, limit, searchQuery, sortDirection]);

  const { isLoading, categories, count } = useSelector(
    (state) => state.category
  );

  const notFound = !categories.length && !!searchQuery;

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
          searchQuery={searchQuery}
          onSearchQuery={handleSearchQuery}
        />
        <CateTableContent
          isLoading={isLoading}
          categories={categories}
          total={count ? count : 0}
          sortDirection={sortDirection}
          page={page}
          limit={limit}
          emptyRows={emptyRows}
          handleSort={handleSort}
          handleChangePage={handleChangePage}
          handleChangeRowsPage={handleChangeRowsPerPage}
          searchQuery={searchQuery}
          notFound={notFound}
        />
      </Card>
    </Container>
  );
}

export default CategoryPage;
