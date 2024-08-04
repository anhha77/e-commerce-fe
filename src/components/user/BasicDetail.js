import React, { useCallback } from "react";
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../utils/numeralFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/profileSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UpdateUserSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is invalid"),
  address: yup.string().required("Address is required"),
});

function BasicDetail() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.profile.isLoading);

  const defaultValues = {
    avatarUrl: user?.avatarUrl || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",

    address: user?.address || "",

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

  const onSubmit = (data) => {
    dispatch(updateProfile());
  };

  return <div>Basic detail</div>;
}

export default BasicDetail;
