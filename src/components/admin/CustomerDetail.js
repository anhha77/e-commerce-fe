import React, { useCallback, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FDatePicker, FormProvider, FTextField, FUploadAvatar } from "../form";
import { fData } from "../../utils/numeralFormat";
import { useDispatch, useSelector } from "react-redux";

import SecurityIcon from "@mui/icons-material/Security";
import AddIcon from "@mui/icons-material/Add";
import CardAddress from "./CardAddress";
import CreateAddressForm from "./CreateAddressForm";
import {
  deleteCustomer,
  updateCustomerProfile,
} from "../../features/customerSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UpdateUserSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is invalid"),
  birthOfDate: yup
    .date()
    .typeError("Please select a valid date")
    .min(new Date("1800-01-01"), "Year before 1800 is not valid")
    .max(new Date(), "Future day is not valid"),
});

function CustomerDetail({ user }) {
  const isLoading = useSelector((state) => state.profile.isLoading);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const defaultValues = {
    avatarUrl: user?.avatarUrl || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    birthOfDate: user?.birthOfDate || new Date().toLocaleString("en-GB"),
    role: user?.role || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateCustomerProfile({ ...data, id: user._id }));
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
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
            <Card>
              <CardHeader title="Security" action={<SecurityIcon />} />
              <CardContent sx={{ px: "24px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    width: 150,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.error.dark,
                    },
                  }}
                  onClick={() =>
                    dispatch(deleteCustomer({ id: user._id })).then(() =>
                      navigate("/admin/users", { replace: true })
                    )
                  }
                >
                  Delete
                </Button>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    display: "block",
                    textAlign: "left",
                    color: "text.secondary",
                  }}
                >
                  A deleted customer cannot be restored. All data will be
                  permanently removed.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="username" label="Username" disabled />
                <FTextField name="email" label="Email" disabled />
                <FTextField name="role" label="Role" disabled />
                <FTextField name="phoneNumber" label="Phone number" />
              </Box>

              <Stack spacing={3} sx={{ mt: 3 }}>
                <FDatePicker
                  name="birthOfDate"
                  label="Birthdate"
                  sx={{ width: "100%", justifyContent: "flex-end" }}
                  error={errors?.fromDate?.message}
                  defaultValue={dayjs(
                    `${user?.birthOfDate || new Date().toLocaleString("en-GB")}`
                  )}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                  sx={{ alignSelf: "flex-end" }}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
            <Card>
              <CardHeader
                title="Address"
                action={
                  <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                  >
                    Address
                  </Button>
                }
              />
              <CreateAddressForm
                user={user}
                open={open}
                handleClose={handleCloseDialog}
              />
              <CardContent>
                <Stack spacing={2}>
                  {user?.address.length === 0 ? (
                    <>
                      <Box
                        sx={{
                          height: { xs: "200px", md: "300px" },
                          backgroundImage:
                            "url('/assets/new_images/add_address.jpg')",
                          backgroundSize: 300,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                      <Typography
                        variant="p"
                        sx={{
                          color: (theme) => theme.palette.text.disabled,
                          textAlign: "center",
                        }}
                      >
                        Add address location
                      </Typography>
                    </>
                  ) : (
                    user?.address.map((item, index) => (
                      <CardAddress
                        key={index}
                        user={user}
                        item={item}
                        index={index}
                      />
                    ))
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default CustomerDetail;
