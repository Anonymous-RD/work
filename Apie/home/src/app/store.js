// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/auth/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
