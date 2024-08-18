import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";
import { fireBaseExtension, fireBaseUpload } from "../utils/firebase";

const initialState = {
  isLoading: false,
  error: null,
  updateProfile: null,
};

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (
    {
      avatarUrl,
      birthOfDate,
      phoneNumber,
      address,
      cartItem,
      oldPassword,
      newPassword,
    },
    thunkAPI
  ) => {
    try {
      const data = {
        birthOfDate,
        phoneNumber,
        address,
        cartItem,
        oldPassword,
        newPassword,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await fireBaseUpload(
          fireBaseExtension,
          "avatar",
          avatarUrl
        );
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put("/users/me", data);
      return { ...response.data.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateProfile = action.payload;
        toast.success("Update Successfully");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.message);
        state.error = action.error.message;
      });
  },
});

export default slice.reducer;
