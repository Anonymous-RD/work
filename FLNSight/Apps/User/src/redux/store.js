// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from "./slices/fetchUserDetailsSlice";
import allUserReducer from "./slices/fetchAllUsersSlice"
import updateUserReducer from "./slices/updateUserSlice"
import deleteUserReducer from "./slices/userDeleteSlice"
import updateSchoolsReducer from "./schoolSlices/updateSchoolSlice"
import fetchSchoolsReducer from "./schoolSlices/fetchAllSchoolsSlice"
import deleteSchoolReducer from "./schoolSlices/schoolDeleteSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails:userReducer,
    allUsers:allUserReducer,
    updateUser:updateUserReducer,
    deleteUser:deleteUserReducer,
    updateSchools:updateSchoolsReducer,
    fetchSchools:fetchSchoolsReducer,
    deleteSchool:deleteSchoolReducer
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
