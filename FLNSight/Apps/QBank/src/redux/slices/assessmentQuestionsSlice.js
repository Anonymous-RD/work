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
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/assessment-qustions/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update");
    }
  }
);
export const fetchQuestionById = createAsyncThunk(
  "questions/getById",
  async ( id ) => {
    const response = await axiosInstance.get(
      `/assessment-qustions/${id}`,
      
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
    currentQuestion: null, 
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
        if (index !== -1) {
          state.questions[index] = {
            ...state.questions[index],
            ...action.payload,
          };
        }
      })
      
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q._id !== action.payload
        );
      })
        // Handle the fulfilled case for fetchQuestionById
        .addCase(fetchQuestionById.fulfilled, (state, action) => {
          // Assuming action.payload contains the question data
          state.currentQuestion = action.payload; // Store the fetched question in the currentQuestion state
        })
        .addCase(fetchQuestionById.rejected, (state, action) => {
          state.error = action.error.message; // Store the error message if the fetch fails
        });
  },
});

export default assessmentSlice.reducer;
