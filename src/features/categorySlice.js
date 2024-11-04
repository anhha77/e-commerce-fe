import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";
import { fireBaseExtension, fireBaseUpload } from "../utils/firebase";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  category: null,
  count: null,
  totalPages: null,
};

export const getCategories = createAsyncThunk(
  "category/getCategries",
  async ({ categoryName, sortDirection, page, limit }, thunkAPI) => {
    try {
      const params = { categoryName, sortDirection, page, limit };
      const response = await apiService.get("/category", { params });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async ({ categoryId }, thunkAPI) => {
    try {
      const response = await apiService.get(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { parentCategoryId, categoryName, imageUrl, childCategories },
    thunkAPI
  ) => {
    try {
      const data = {
        parentCategoryId,
        categoryName,
        imageUrl,
        childCategories,
      };
      if (imageUrl instanceof File) {
        imageUrl = await fireBaseUpload(
          fireBaseExtension,
          "category",
          imageUrl
        );
      }
      const response = await apiService.post("/admin/category", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const { categories, count, totalPages } = action.payload;
        state.isLoading = false;
        state.categories = categories;
        state.count = count;
        state.totalPages = totalPages;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });

    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
        toast.success("Get Category Successfully");
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
        toast.success("Create Category Successfully");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      });
  },
});

export default slice.reducer;
