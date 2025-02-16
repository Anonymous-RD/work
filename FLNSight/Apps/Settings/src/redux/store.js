// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/fetchUserDetailsSlice";
import assessmentQuestionReducer from "./slices/assessmentQuestionsSlice";
import learningOutcomesReducer from "./slices/LearnerOutcomeSlice";
import districtReducer from "./slices/districtSlice";
import blockReducer from "./slices/blockSlice";
import classesReducer from "./slices/classesSlice";
import subjectsReducer from "./slices/subjectsSlice"
import chaptersReducer from "./slices/chaptersSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userReducer,
    assessmentQuestions: assessmentQuestionReducer,
    learningOutcomes: learningOutcomesReducer,
    district: districtReducer,
    block: blockReducer,
    classes: classesReducer,
    subjects: subjectsReducer,
    chapters: chaptersReducer,
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
