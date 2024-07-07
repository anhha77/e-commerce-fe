import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "src/components/iconify";
import { bgGradient } from "../theme/css";
import { useTheme } from "@emotion/react";
import Logo from "../components/Logo";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const auth = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      await auth.register({ username, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.responseError && (
          <Alert severity="error">{errors.responseError.message}</Alert>
        )}
        <FTextField name="username" label="Username" />
        <FTextField name="email" label="Email address" />

        <FTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FTextField
          name="passwordConfirmation"
          label="Password Confirmation"
          type={showPasswordConfirmation ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPasswordConfirmation)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPasswordConfirmation
                        ? "eva:eye-fill"
                        : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={onSubmit}
        loading={isSubmitting}
      >
        Register
      </LoadingButton>
    </FormProvider>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Register to ShopNow</Typography>
          <Alert severity="info">
            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an acount?{" "}
              <Link component={RouterLink} variant="subtitle2" sx={{ ml: 0.5 }}>
                Sign In
              </Link>
            </Typography>
          </Alert>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
