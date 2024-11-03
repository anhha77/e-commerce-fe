import { configureStore, combineReducers } from "@reduxjs/toolkit";
import customerReducer from "../features/customerSlice";
import profileReducer from "../features/profileSlice";
import categoryReducer from "../features/categorySlice";

const store = configureStore({
  reducer: combineReducers({
    customer: customerReducer,
    profile: profileReducer,
    category: categoryReducer,
  }),
});

export default store;
