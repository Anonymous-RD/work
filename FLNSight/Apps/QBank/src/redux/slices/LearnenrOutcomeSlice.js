import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

// Helper function to get token from cookies
const getAuthToken = () => {
  return Cookies.get("token"); // Replace 'token' with your cookie name
};

// Axios instance with token included
const axiosInstance = axios.create({
  baseURL: "https://us-central1-firecmsdemo.cloudfunctions.net/qbank", // Replace with your API base URL
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
export const fetchLearningOutcomes = createAsyncThunk(
  "learningOutcomes/fetch",
  async () => {
    const response = await axiosInstance.get("/learning-outcome");
    return response.data;
  }
);

export const createLearningOutcome = createAsyncThunk(
  "learningOutcomes/create",
  async (newOutcome) => {
    const response = await axiosInstance.post("/learning-outcome", newOutcome);
    return response.data;
  }
);

export const updateLearningOutcome = createAsyncThunk(
  "learningOutcomes/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(
      `/learning-outcome/${id}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteLearningOutcome = createAsyncThunk(
  "learningOutcomes/delete",
  async (id) => {
    const response = await axiosInstance.delete(`/learning-outcome/${id}`);
    return id;
  }
);

// Redux Slice
const learningOutcomeSlice = createSlice({
  name: "learningOutcome",
  initialState: {
    outcomes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLearningOutcomes.fulfilled, (state, action) => {
        state.outcomes = action.payload;
      })
      .addCase(createLearningOutcome.fulfilled, (state, action) => {
        state.outcomes.push(action.payload);
      })
      .addCase(updateLearningOutcome.fulfilled, (state, action) => {
        const index = state.outcomes.findIndex(
          (outcome) => outcome._id === action.payload._id
        );
        if (index !== -1) state.outcomes[index] = action.payload;
      })
      .addCase(deleteLearningOutcome.fulfilled, (state, action) => {
        state.outcomes = state.outcomes.filter(
          (outcome) => outcome._id !== action.payload
        );
      });
  },
});

export default learningOutcomeSlice.reducer;
