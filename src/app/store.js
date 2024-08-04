import { configureStore, combineReducers } from "@reduxjs/toolkit";
import customerReducer from "../features/customerSlice";
import profileReducer from "../features/profileSlice";

const store = configureStore({
  reducer: combineReducers({
    customer: customerReducer,
    profile: profileReducer,
  }),
});

export default store;
