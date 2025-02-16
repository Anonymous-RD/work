import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/",
});

// Async actions for CRUD operations
export const fetchOutput = createAsyncThunk(
  "output/fetch",
  async () => {
    const response = await axiosInstance.get("/output");
    return response.data;
  }
);

export const createOutput = createAsyncThunk(
  "output/create",
  async (newOutput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/output", newOutput);
      return response.data;
    } catch (error) {
      console.error("Error in createOutput:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOutput = createAsyncThunk(
  "output/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/output/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error in updateOutput:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOutput = createAsyncThunk(
  "output/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/output/${id}`);
      return id;
    } catch (error) {
      console.error("Error in deleteOutput:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice for Output
const outputSlice = createSlice({
  name: "output",
  initialState: { outputs: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutput.fulfilled, (state, action) => {
        state.outputs = action.payload;
      })
      .addCase(createOutput.fulfilled, (state, action) => {
        state.outputs.push(action.payload);
      })
      .addCase(updateOutput.fulfilled, (state, action) => {
        const index = state.outputs.findIndex((output) => output._id === action.payload._id);
        if (index !== -1) state.outputs[index] = action.payload;
      })
      .addCase(deleteOutput.fulfilled, (state, action) => {
        state.outputs = state.outputs.filter((output) => output._id !== action.payload);
      });
  },
});

export default outputSlice.reducer;







