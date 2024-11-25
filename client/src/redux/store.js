import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { postApi } from "./postApiSlice";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
