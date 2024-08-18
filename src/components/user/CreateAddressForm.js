import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FSwitch } from "../../components/form";

import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/profileSlice";
import useAuth from "../../hooks/useAuth";

const validateAddressForm = yup.object().shape({
  country: yup.string().required("Country is required"),
  addressLocation: yup.string().required("Address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

function CreateAddressForm({ open, handleClose }) {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.profile.isLoading);

  let addressList = user?.address;

  const defaultValues = {
    country: "",
    addressLocation: "",
    phoneNumber: "",
    isDefault: false,
  };

  const methods = useForm({
    resolver: yupResolver(validateAddressForm),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (addressList.length < 4 && data.isDefault) {
      addressList = addressList.map((address) => ({
        ...address,
        isDefault: false,
      }));
    }
    addressList = [...addressList, data];
    dispatch(updateUserProfile({ address: addressList })).then(() => reset());
  };

  return (
    <Dialog
      open={Boolean(open)}
      // TransitionComponent={Transition}
      onClose={handleClose}
    >
      <FormProvider
        methods={methods}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleSubmit(onSubmit)();
        }}
      >
        <DialogTitle>{"Add Address"}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <FSwitch name="isDefault" label="Default" />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
              onClick={handleClose}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

export default CreateAddressForm;
