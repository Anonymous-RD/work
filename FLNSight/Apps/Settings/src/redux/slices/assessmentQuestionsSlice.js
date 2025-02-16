import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

// Helper function to get token from cookies
const getAuthToken = () => {
  return Cookies.get("token"); // Replace 'token' with your cookie name
};

// Axios instance with token included
const axiosInstance = axios.create({
  baseURL: "https://us-central1-firecmsdemo.cloudfunctions.net/monitoring", // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Async Thunks
export const fetchQuestions = createAsyncThunk("questions/fetch", async () => {
  const response = await axiosInstance.get("/assessment-qustions");
  return response.data;
});

export const createQuestion = createAsyncThunk(
  "questions/create",
  async (newQuestion) => {
    const response = await axiosInstance.post(
      "/assessment-qustions",
      newQuestion
    );
    return response.data;
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(
      `/assessment-qustions/${id}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (id) => {
    const response = await axiosInstance.patch(`/assessment-qustions/${id}`, {
      isActive: false,
    }); // Soft delete
    return id;
  }
);

// Redux Slice
const assessmentSlice = createSlice({
  name: "assessment",
  initialState: {
    questions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.filter((q) => q.isActive); // Filter active questions
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) state.questions[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q._id !== action.payload
        );
      });
  },
});

export default assessmentSlice.reducer;
