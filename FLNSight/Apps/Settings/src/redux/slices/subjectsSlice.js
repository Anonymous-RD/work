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

export const fetchSubjects = createAsyncThunk(
  "subjects/fetch",
  async () => {
    const response = await axiosInstance.get("/subjects");
    return response.data;
  }
);

export const createSubject = createAsyncThunk(
  "subjects/create",
  async (newSubject) => {
    const response = await axiosInstance.post("/subjects", newSubject);
    return response.data;
  }
);

 export const createSubjectsBulk = createAsyncThunk(
    "block/createBulk", 
    async ({checkField, datas}) => {
      const payload = {
        checkField,
        datas,
      }
      const response = await axiosInstance.post("/subjects/bulk", payload);
      return response.data.results.map((result) => result.data);
    }
  );

export const updateSubject = createAsyncThunk(
  "subjects/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(`/subjects/${id}`, updatedData);
    return response.data;
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async (id) => {
    await axiosInstance.delete(`/subjects/${id}`);
    return id;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: { subjects: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      .addCase(createSubjectsBulk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
        state.subjects = [...state.subjects, ...action.payload]; 
      } else {
        console.error("Invalid payload format:", action.payload);
      }
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.subjects[index] = action.payload;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter((subj) => subj._id !== action.payload);
      });
  },
});

export default subjectsSlice.reducer;
