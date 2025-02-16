
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/fetchUserDetailsSlice";
import irReducer from "./slices/irSlice";
import sirReducer from "./slices/sirSlice";
import outputReducer from "./slices/ouputSlice";
import activityReducer from "./slices/activitySlice";


const store = configureStore({
  reducer: {
    userDetails: userReducer,
    ir: irReducer,
    sir: sirReducer,
    output: outputReducer,
    activity: activityReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/registerUser/fulfilled"],
        ignoredPaths: ["auth.user"],
      },
    }),
});

export default store;
