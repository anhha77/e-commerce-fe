import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Slide,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { LoadingButton } from "@mui/lab";

const validateAddressForm = yup.object().shape({
  country: yup.string().required("Country is required"),
  addressLocation: yup.string().required("Address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

function AddressDialog({ open, index, handleClose }) {
  const { user } = useAuth();
  const address = user.address[index];
  const isLoading = useSelector((state) => state.profile.isLoading);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const defaultValues = {
    country: address?.country || "",
    addressLocation: address?.addressLocation || "",
    phoneNumber: address?.phoneNumber || "",
  };

  const methods = useForm({
    resolver: yupResolver(validateAddressForm),
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
    <Dialog
      open={Boolean(open)}
      // TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle>
        {"Address Edit"}
        {index}
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ minWidth: 500, mt: 1 }}>
            <FTextField
              name="country"
              label="Country"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FlagIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="addressLocation"
              label="Address"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContactPhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || isLoading}
          onClick={handleClose}
        >
          Save Changes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddressDialog;
