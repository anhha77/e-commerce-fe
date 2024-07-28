import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
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
      console.log(typeof usernameSearch);
      const response = await apiService.get("/users", { params });
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
  },
});

export default slice.reducer;
