import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
};

function PasswordDetail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validatePassword),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <FTextField
              name="oldPassword"
              label="Old Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={(prev) => setShowPassword(!prev)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <FTextField
              name="newPassword"
              label="New Password"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={(prev) => setShowNewPassword(!prev)}>
                    {showNewPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />

            <FTextField
              name="confirmNewPassword"
              label="Confirm New Password"
              fullWidth
              type={showConfirmNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(prev) => setShowConfirmNewPassword(!prev)}
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

export default PasswordDetail;
