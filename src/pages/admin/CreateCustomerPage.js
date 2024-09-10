import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useCallback, useState } from "react";
import { fData } from "../../utils/numeralFormat";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FDatePicker,
  FormProvider,
  FTextField,
  FUploadAvatar,
} from "../../components/form";
import Iconify from "../../components/Iconify";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import RemoveIcon from "@mui/icons-material/Remove";
import { createCustomer } from "../../features/customerSlice";
import dayjs from "dayjs";

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
  role: yup.string().required("Role is required"),
  // address: yup.array().when({
  //   is: (exists) => !!exists,
  //   then: () => yup.array().of(yup.object().shape(validateAddressSchema)),
  // }),
  birthOfDate: yup
    .date()
    .typeError("Please select a valid date")
    .min(new Date("1800-01-01"), "Year before 1800 is not valid")
    .max(new Date(), "Future day is not valid"),
  address: yup.array().of(validateAddressSchema),
});

const roles = ["admin", "user"];

function CreateCustomersPage() {
  const isLoading = useSelector((state) => state.customer.isLoading);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isDefaultList, setIsDefaultList] = useState([]);

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    birthOfDate: new Date().toLocaleDateString("en-GB"),
    phoneNumber: "",
    role: "user",
    address: [],
  };

  const methods = useForm({
    resolver: yupResolver(CreateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    control,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });

  const onSubmit = (data) => {
    if (data.address.length === 0) {
      data.address = undefined;
    } else {
      if (!isDefaultList.includes(true)) {
        data.address[0].isDefault = true;
      }
    }

    if (data.birthOfDate === "") {
      data.birthOfDate = undefined;
    }

    if (data.phoneNumber === "") {
      data.phoneNumber = undefined;
    }

    dispatch(createCustomer({ ...data })).then(() => {
      setIsDefaultList([]);
      reset();
    });
  };

  const handleAddAddress = () => {
    setIsDefaultList([...isDefaultList, false]);
    append({
      country: "",
      addressLocation: "",
      phoneNumber: "",
      isDefault: false,
    });
  };

  const handleDeleteAddress = (index) => {
    setIsDefaultList((prev) => prev.filter((item, i) => i !== index));
    remove(index);
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

  console.log(methods.getValues());
  function FSwitchAddress({ name, ...other }) {
    const { control } = useFormContext();

    return (
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => {
                  if (isDefaultList.includes(true) && e.target.checked) {
                    setIsDefaultList((prev) =>
                      prev.map((item, i) => {
                        if (i !== other.index) {
                          setValue(`address.${i}.isDefault`, false);
                          return false;
                        } else {
                          setValue(`address.${i}.isDefault`, true);
                          return true;
                        }
                      })
                    );
                  } else {
                    setIsDefaultList((prev) =>
                      prev.map((item, i) => {
                        if (i !== other.index) {
                          return false;
                        } else {
                          return e.target.checked;
                        }
                      })
                    );
                  }
                  field.onChange(e);
                }}
              />
            )}
          />
        }
        {...other}
      />
    );
  }

  const CardAddress = ({ index }) => {
    return (
      <Card>
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              {`Address ${index + 1}`}
              <FSwitchAddress
                name={`address.${index}.isDefault`}
                label="Default"
                index={index}
              />
            </Box>
          }
          action={
            <Button
              variant="text"
              endIcon={<RemoveIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.error.dark,
                  color: "white",
                },
              }}
              onClick={() => handleDeleteAddress(index)}
            >
              Delete
            </Button>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <FTextField
              name={`address.${index}.country`}
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
              name={`address.${index}.addressLocation`}
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
              name={`address.${index}.phoneNumber`}
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
        </CardContent>
      </Card>
    );
  };

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
        <Grid container spacing={3}>
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

          <Grid item xs={12} md={8}>
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
                <FTextField name="username" label="Username" />
                <FTextField name="email" label="Email" />

                <FTextField
                  name="password"
                  label="Password"
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
                <FTextField name="phoneNumber" label="Phone Number" />

                {/* <FTextField name="birthOfDate" label="Birthdate" /> */}
                <FDatePicker
                  name="birthOfDate"
                  label="Birthdate"
                  sx={{ width: "100%", justifyContent: "flex-end" }}
                  error={errors?.fromDate?.message}
                  defaultValue={dayjs(`${new Date()}`)}
                />
                <FTextField
                  name="role"
                  label="Role"
                  select
                  sx={{ paddingTop: 1 }}
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </FTextField>
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Divider sx={{ borderStyle: "dashed" }} />

              <Card>
                <CardHeader
                  title="Address"
                  action={
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={handleAddAddress}
                    >
                      Address
                    </Button>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    <>
                      {fields?.length === 0 ? (
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
                        fields.map((field, index) => (
                          <CardAddress key={field.id} index={index} />
                        ))
                      )}
                    </>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CreateCustomersPage;
