import { configureStore, combineReducers } from "@reduxjs/toolkit";
import customerReducer from "../features/customerSlice";

const store = configureStore({
  reducer: combineReducers({
    customer: customerReducer,
  }),
});

export default store;
