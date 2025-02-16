import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/",
});

// Async actions for CRUD operations
export const fetchSIR = createAsyncThunk(
  "sir/fetch",
  async () => {
    const response = await axiosInstance.get("/sir");
    return response.data;
  }
);

export const createSIR = createAsyncThunk(
  "sir/create",
  async (newSIR, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/sir", newSIR);
      return response.data;
    } catch (error) {
      console.error("Error in createSIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSIR = createAsyncThunk(
  "sir/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/sir/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error in updateSIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSIR = createAsyncThunk(
  "sir/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/sir/${id}`);
      return id;
    } catch (error) {
      console.error("Error in deleteSIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice for SIR
const sirSlice = createSlice({
  name: "sir",
  initialState: { sirs: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSIR.fulfilled, (state, action) => {
        state.sirs = action.payload;
      })
      .addCase(createSIR.fulfilled, (state, action) => {
        state.sirs.push(action.payload);
      })
      .addCase(updateSIR.fulfilled, (state, action) => {
        const index = state.sirs.findIndex((sir) => sir._id === action.payload._id);
        if (index !== -1) state.sirs[index] = action.payload;
      })
      .addCase(deleteSIR.fulfilled, (state, action) => {
        state.sirs = state.sirs.filter((sir) => sir._id !== action.payload);
      });
  },
});

export default sirSlice.reducer;










// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "./axiosInstance";

// export const fetchSIRs = createAsyncThunk("sir/fetch", async () => {
//   const response = await axiosInstance.get("/sir");
//   return response.data;
// });

// export const createSIR = createAsyncThunk("sir/create", async (sirData) => {
//   const response = await axiosInstance.post("/sir", sirData);
//   return response.data;
// });

// const sirSlice = createSlice({
//   name: "sir",
//   initialState: { data: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSIRs.fulfilled, (state, action) => {
//         state.data = action.payload;
//       })
//       .addCase(createSIR.fulfilled, (state, action) => {
//         state.data.push(action.payload);
//       });
//   },
// });

// export default sirSlice.reducer;
