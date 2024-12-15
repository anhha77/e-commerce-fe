import React, { useCallback, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fData } from "../../utils/numeralFormat";
import { LoadingButton } from "@mui/lab";

const UpdateCateSchema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
});

function CategoryDetailPage() {
  const { categoryId } = useParams();

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

  useEffect(() => {
    dispatch(getCategory({ categoryId }));
  }, [dispatch, categoryId]);

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
              <Grid item sx={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
                  <FUploadAvatar
                    name="imageUrl"
                    maxSize={3145728}
                    onDrop={handleDrop}
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
                    defaultValue={`${category?.category?.imageUrl || ""}`}
                    sx={{
                      border: "none",
                      borderRadius: "10px",
                      width: 200,
                      height: 200,
                    }}
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
          </FormProvider>
        </Container>
      )}
    </>
  );
}

export default CategoryDetailPage;
