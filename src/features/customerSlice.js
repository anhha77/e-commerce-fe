import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";
import { fireBaseExtension, fireBaseUpload } from "../utils/firebase";

const initialState = {
  isLoading: false,
  error: null,
  selectedCustomer: null,
  currentPageCustomers: [],
  customersById: {},
  totalPages: 1,
  totalCustomers: null,
};

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (
    {
      page,
      limit,
      searchQuery,
      usernameSearch,
      emailSearch,
      phoneNumberSearch,
      orderBy,
      sortDirection,
    },
    thunkAPI
  ) => {
    try {
      const params = {
        page,
        limit,
        searchQuery,
        usernameSearch,
        emailSearch,
        phoneNumberSearch,
        orderBy,
        sortDirection,
      };
      const response = await apiService.get("/admin/users", { params });
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleCustomer = createAsyncThunk(
  "customer/getCustomer",
  async ({ id }, thunkAPI) => {
    try {
      const response = await apiService.get(`/admin/users/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (
    { avatarUrl, username, email, password, birthOfDate, phoneNumber, address },
    thunkAPI
  ) => {
    try {
      const data = {
        avatarUrl,
        username,
        email,
        password,
        birthOfDate,
        phoneNumber,
        address,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await fireBaseUpload(
          fireBaseExtension,
          "avatar",
          avatarUrl
        );
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.post("/admin/users", data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCustomerProfile = createAsyncThunk(
  "customer/updateCustomer",
  async (
    { id, avatarUrl, birthOfDate, phoneNumber, address, cartItem },
    thunkAPI
  ) => {
    try {
      const data = {
        birthOfDate,
        phoneNumber,
        address,
        cartItem,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await fireBaseUpload(
          fireBaseExtension,
          "avatar",
          avatarUrl
        );
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/admin/users/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        const { users, count, totalPages } = action.payload;
        state.currentPageCustomers = users.map((user) => user._id);
        users.forEach((user) => {
          state.customersById[user._id] = user;
        });
        state.totalCustomers = count;
        state.totalPages = totalPages;
        state.isLoading = false;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });

    builder
      .addCase(getSingleCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
        state.isLoading = false;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });

    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });

    builder
      .addCase(updateCustomerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });
  },
});

export default slice.reducer;
