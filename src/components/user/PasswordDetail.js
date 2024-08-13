import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";

import Iconify from "../Iconify";
import { LoadingButton } from "@mui/lab";
import { updateUserProfile } from "../../features/profileSlice";

const validatePassword = yup.object().shape({
  oldPassword: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .notOneOf([yup.ref("oldPassword"), null], "Password must be different"),
  confirmNewPassword: yup
    .string()
    .required("Confirm new password is required")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm new password must be the same as new password"
    ),
});

const defaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function PasswordDetail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { isLoading } = useSelector((state) => state.profile);

  const methods = useForm({
    resolver: yupResolver(validatePassword),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUserProfile({ ...data })).then(() => reset());
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack spacing={3} alignItems="flex-end">
            <FTextField
              name="oldPassword"
              label="Old Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FTextField
              name="newPassword"
              label="New Password"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showNewPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FTextField
              name="confirmNewPassword"
              label="Confirm New Password"
              fullWidth
              type={showConfirmNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showConfirmNewPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

export default PasswordDetail;
