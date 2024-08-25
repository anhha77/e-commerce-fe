import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useCallback } from "react";
import { fData } from "../../utils/numeralFormat";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateAddressSchema = yup.object().shape({
  addressLocation: yup.string().required("Address location is required"),
  country: yup.string().required("Country is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is invalid"),
});

const CreateUserSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  address: yup.array().when({
    is: (exists) => !!exists,
    then: yup.array().of(yup.object().shape(validateAddressSchema)),
  }),
});

function CreateCustomersPage() {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    birthOfDate: "",
    phoneNumber: "",
    role: "",
    address: null,
  };

  const methods = useForm({
    resolver: yupResolver(CreateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <Container>
      <Stack
        direction="row"
        component={RouterLink}
        to={"/admin/users"}
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
          Customers List
        </Typography>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Create Customer
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <FUploadAvatar
                name="avatarUrl"
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
              />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CreateCustomersPage;
