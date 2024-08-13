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
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../utils/numeralFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/profileSlice";

import SecurityIcon from "@mui/icons-material/Security";
import AddIcon from "@mui/icons-material/Add";
import CardAddress from "./CardAddress";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UpdateUserSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is invalid"),
});

const addressTestList = [
  {
    country: "VN",
    address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phoneNumber: "+1 202-555-0143",
    isDefault: true,
  },
  {
    country: "VN",
    address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
    phoneNumber: "+1 416-555-0198",
    isDefault: false,
  },
  {
    country: "VN",
    address: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",
    phoneNumber: "+44 20 7946 0958",
    isDefault: false,
  },
  {
    country: "VN",
    address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
    phoneNumber: "+61 2 9876 5432",
    isDefault: false,
  },
];

function BasicDetail() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.profile.isLoading);

  const defaultValues = {
    avatarUrl: user?.avatarUrl || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    birthOfDate: user?.birthOfDate || "",
    role: user?.role || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(updateUserProfile({ ...data }));
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
                <FTextField name="birthOfDate" label="Birthdate" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <FTextField name="phoneNumber" label="Phone number" />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
            <Card>
              <CardHeader
                title="Address"
                action={
                  <Button variant="text" startIcon={<AddIcon />}>
                    Address
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  {user?.address.map((item, index) => (
                    <CardAddress key={index} item={item} index={index} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default BasicDetail;
