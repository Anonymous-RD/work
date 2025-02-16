// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/fetchUserDetailsSlice";
import assessmentQuestionReducer from "./slices/assessmentQuestionsSlice";
import learningOutcomeReducer from "./slices/LearnenrOutcomeSlice";
import dataReducer from "./slices/dataSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userReducer,
    assessmentQuestions: assessmentQuestionReducer,
    // learningOutcomes: learningOutcomesReducer,
    learningOutcome: learningOutcomeReducer,
    data: dataReducer,
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
