// Redux Slice for Blocks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const getAuthToken = () => Cookies.get("token");

const axiosInstance = axios.create({
  baseURL: "https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails",
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

// Async actions for CRUD operations
export const fetchBlocks = createAsyncThunk(
  "block/fetch",
  async () => {
    const response = await axiosInstance.get("/block-zone");
    return response.data;
  }
);

// export const createBlock = createAsyncThunk(
//   "block/create",
//   async (newBlock) => {
//     const response = await axiosInstance.post("/block-zone", newBlock);
//     return response.data;
//   }
// );

export const createBlock = createAsyncThunk(
    "block/create",
    async (newBlock, { rejectWithValue }) => {
      try {
        console.log("Payload being sent:", newBlock); 
        const response = await axiosInstance.post("/block-zone", newBlock);
        return response.data;
      } catch (error) {
        console.error("Error in createBlock:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const createBlocksBulk = createAsyncThunk(
    "block/createBulk", 
    async ({checkField, datas}) => {
      const payload = {
        checkField,
        datas,
      }
      const response = await axiosInstance.post("/block-zone/bulk", payload);
      return response.data.results.map((result) => result.data);
    }
  );
  

export const updateBlock = createAsyncThunk(
  "block/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(`/block-zone/${id}`, updatedData);
    return response.data;
  }
);

export const deleteBlock = createAsyncThunk(
  "block/delete",
  async (id) => {
    await axiosInstance.delete(`/block-zone/${id}`);
    return id;
  }
);


// Redux slice for Blocks
const blockSlice = createSlice({
  name: "block",
  initialState: { blocks: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.blocks = action.payload;
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        state.blocks.push(action.payload);
      })
      .addCase(createBlocksBulk.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
      state.blocks = [...state.blocks, ...action.payload]; 
      } else {
        console.error("Invalid payload format:", action.payload);
      }
      })
      .addCase(updateBlock.fulfilled, (state, action) => {
        const index = state.blocks.findIndex((b) => b._id === action.payload.id);
        if (index !== -1) state.blocks[index] = action.payload;
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        state.blocks = state.blocks.filter((block) => block._id !== action.payload);
      });
  },
});

export default blockSlice.reducer;
