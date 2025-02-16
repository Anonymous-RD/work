// Redux Slice for Chapters
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
export const fetchChapters = createAsyncThunk(
  "chapter/fetch",
  async () => {
    const response = await axiosInstance.get("/chapters");
    return response.data;
  }
);

export const createChapter = createAsyncThunk(
  "chapter/create",
  async (newChapter, { rejectWithValue }) => {
    try {
      console.log("Payload being sent:", newChapter); // Debugging log
      const response = await axiosInstance.post("/chapters", newChapter);
      return response.data;
    } catch (error) {
      console.error("Error in createChapter:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

 export const createChaptersBulk = createAsyncThunk(
    "block/createBulk", 
    async ({checkField, datas}) => {
      const payload = {
        checkField,
        datas,
      }
      const response = await axiosInstance.post("/chapters/bulk", payload);
      return response.data.results.map((result) => result.data);
    }
  );

export const updateChapter = createAsyncThunk(
  "chapter/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(`/chapters/${id}`, updatedData);
    return response.data;
  }
);

export const deleteChapter = createAsyncThunk(
  "chapter/delete",
  async (id) => {
    await axiosInstance.delete(`/chapters/${id}`);
    return id;
  }
);

// Redux slice for Chapters
const chaptersSlice = createSlice({
  name: "chapter",
  initialState: { chapters: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.chapters = action.payload;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.chapters.push(action.payload);
      })
      .addCase(createChaptersBulk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
        state.chapters = [...state.chapters, ...action.payload]; 
      } else {
        console.error("Invalid payload format:", action.payload);
      }
      })
      .addCase(updateChapter.fulfilled, (state, action) => {
        const index = state.chapters.findIndex((c) => c._id === action.payload.id);
        if (index !== -1) state.chapters[index] = action.payload;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.chapters = state.chapters.filter((chapter) => chapter._id !== action.payload);
      });
  },
});

export default chaptersSlice.reducer;
