import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  selectedUser: null,
  updateProfile: null,
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export default slice.reducer;
