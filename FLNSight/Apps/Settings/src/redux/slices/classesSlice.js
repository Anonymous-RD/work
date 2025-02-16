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

export const fetchClasses = createAsyncThunk(
  "classes/fetch",
  async () => {
    const response = await axiosInstance.get("/classes");
    return response.data;
  }
);

export const createClass = createAsyncThunk(
  "classes/create",
  async (newClass) => {
    const response = await axiosInstance.post("/classes", newClass);
    return response.data;
  }
);

 export const createClassesBulk = createAsyncThunk(
    "block/createBulk", 
    async ({checkField, datas}) => {
      const payload = {
        checkField,
        datas,
      }
      const response = await axiosInstance.post("/classes/bulk", payload);
      return response.data.results.map((result) => result.data);
    }
  );

export const updateClass = createAsyncThunk(
  "classes/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(`/classes/${id}`, updatedData);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  "classes/delete",
  async (id) => {
    await axiosInstance.delete(`/classes/${id}`);
    return id;
  }
);

const classesSlice = createSlice({
  name: "classes",
  initialState: { classes: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(createClassesBulk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
        state.classes = [...state.classes, ...action.payload]; 
      } else {
        console.error("Invalid payload format:", action.payload);
      }
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.classes[index] = action.payload;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter((cls) => cls._id !== action.payload);
      });
  },
}); 

export default classesSlice.reducer;
