import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getCategory, updateCategory } from "../../features/categorySlice";
import LoadingScreen from "../../components/LoadingScreen";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fData } from "../../utils/numeralFormat";
import { LoadingButton } from "@mui/lab";
import Scrollbar from "../../components/scrollbar";
import CateTableHead from "../../components/cate-table/CateTableHead";
import CateTableRow from "../../components/cate-table/CateTableRow";
import TableEmptyRows from "../../components/table/TableEmptyRows";

const UpdateCateSchema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
});

function CategoryDetailPage() {
  const { categoryId } = useParams();
  const [sortDirection, setSortDirection] = useState(1);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const { category, isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // const defaultValues = {
  //   categoryName: category?.category?.categoryName || "",
  //   imageUrl: category?.category?.imageUrl || "",
  //   description: category?.category?.description || "",
  // };

  const methods = useForm({
    resolver: yupResolver(UpdateCateSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateCategory({ ...data, categoryId }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "imageUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  const handleSort = () => {
    if (sortDirection === -1) {
      setSortDirection(1);
    } else {
      setSortDirection(-1);
    }
  };

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

  useEffect(() => {
    dispatch(getCategory({ categoryId }));
  }, [dispatch, categoryId]);

  const sortCateName = (a, b) => {
    if (sortDirection === 1) {
      return 1;
    }
    return -1;
  };

  return (
    <>
      {isLoading || !category?.category ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Stack
            direction="row"
            component={RouterLink}
            to={"/admin/categories"}
            gap={1}
            sx={{
              textDecoration: "none",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
            <Typography
              variant="p"
              gutterBottom
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Categories List
            </Typography>
          </Stack>

          <Stack direction="row" gap={2}>
            <Typography variant="h5" gutterBottom>
              Category Detail
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                  <FUploadAvatar
                    name="imageUrl"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    defaultValue={`${category?.category?.imageUrl || ""}`}
                    sx={{
                      border: "none",
                      borderRadius: "10px",
                      width: 200,
                      height: 200,
                    }}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: "auto",
                          display: "block",
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <FTextField
                      name="categoryName"
                      label="Category Name"
                      defaultValue={`${category?.category?.categoryName || ""}`}
                    />
                    <FTextField
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      placeholder="Add a description for this category"
                      defaultValue={`${category?.category?.description || ""}`}
                    />
                    <Stack
                      direction="row"
                      justifyContent={`${
                        category.category.parentCategoryId
                          ? "space-between"
                          : "right"
                      }`}
                      alignItems="center"
                    >
                      {category.category.parentCategoryId ? (
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: (theme) => theme.palette.grey[400] }}
                          >
                            Parent category:{" "}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: (theme) => theme.palette.grey[500] }}
                            component={RouterLink}
                            to={`/admin/categories/${category.category.parentCategoryId._id}`}
                          >
                            {category.category.parentCategoryId.categoryName}
                          </Typography>
                        </Box>
                      ) : null}

                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting || isLoading}
                      >
                        Save Changes
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ borderStyle: "dashed", my: 2 }} />

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
                        {category.childCategories
                          .slice(0, category.childCategories.length)
                          .sort((a, b) =>
                            sortCateName(a.categoryName, b.categoryName)
                          )
                          .slice(page * limit, page * limit + limit)
                          .map((childCate) => (
                            <CateTableRow
                              key={childCate._id}
                              category={childCate}
                              isLoading={isLoading}
                            />
                          ))}
                        <TableEmptyRows
                          height={77}
                          emptyRows={emptyRows(
                            page,
                            limit,
                            category.childCategories.slice(
                              page * limit,
                              page * limit + limit
                            ).length
                          )}
                        />
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
                count={category.childCategories.length}
                rowsPerPage={limit}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          </FormProvider>
        </Container>
      )}
    </>
  );
}

export default CategoryDetailPage;
