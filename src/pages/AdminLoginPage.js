import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { FormProvider, FTextField } from "../components/form";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { bgGradient } from "../theme/css";

import Logo from "../components/Logo";
import Iconify from "../components/Iconify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UserLogo from "../components/UserLogo";
import UserPopover from "../components/UserPopover";

// ----------------------------------------------------------------------

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/admin";
    const { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        auth.loginAsAdmin(() => navigate(from, { replace: true }));
      });
    } catch (error) {
      reset();
      setError("responseError", error);
      console.log(errors);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.responseError && (
          <Alert severity="error">{errors.responseError.message}</Alert>
        )}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link component={RouterLink} variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );

  return (
    <>
      <UserLogo
        isAdmin={isAdmin}
        sx={{
          width: 50,
          height: 50,
          mb: "5",
          display: "flex",
          alignItems: "center",
        }}
        handleAction={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      />
      <UserPopover
        anchorEl={anchorEl}
        handleClose={handleClose}
        setIsAdmin={setIsAdmin}
      />
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
            <Typography variant="h4">Admin Login</Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Don’t have an account?{" "}
                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  sx={{ ml: 0.5 }}
                  to="/register"
                >
                  Get started
                </Link>
              </Typography>
            </Alert>
            {renderForm}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
