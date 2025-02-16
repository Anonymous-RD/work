// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from "./slices/fetchUserDetailsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails:userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/registerUser/fulfilled'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
