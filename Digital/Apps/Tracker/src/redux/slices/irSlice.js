import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/",
});


export const fetchIR = createAsyncThunk(
  "ir/fetch",
  async () => {
    const response = await axiosInstance.get('/ir');
    return response.data;
  }
);

export const createIR = createAsyncThunk(
  "ir/create",
  async (newIR, { rejectWithValue }) => {
    try {
      console.log("Payload being sent:", newIR); 
      const response = await axiosInstance.post("/ir", newIR);
      return response.data;
    } catch (error) {
      console.error("Error in createIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateIR = createAsyncThunk(
  "ir/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    if (!id || !updatedData) {
      return rejectWithValue("Invalid data: missing id or updatedData");
    }

    try {
      const response = await axiosInstance.patch(`/ir/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error in updateIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const deleteIR = createAsyncThunk(
  "ir/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/ir/${id}`);
      return id;
    } catch (error) {
      console.error("Error in deleteIR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const irSlice = createSlice({
  name: "ir",
  initialState: { irs: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIR.fulfilled, (state, action) => {
        // state.irs.push(action.payload);
        state.irs = action.payload;
      })
      .addCase(createIR.fulfilled, (state, action) => {
        state.irs.push(action.payload);
      })
      .addCase(updateIR.fulfilled, (state, action) => {
        const index = state.irs.findIndex((ir) => ir._id === action.payload._id);
        if (index !== -1) state.irs[index] = action.payload;
      })
      .addCase(updateIR.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteIR.fulfilled, (state, action) => {
        state.irs = state.irs.filter((ir) => ir._id !== action.payload);
      });
  },
});

export default irSlice.reducer;











