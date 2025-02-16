// src/redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk to fetch classes
export const fetchClasses = createAsyncThunk("data/fetchClasses", async () => {
  const token = Cookies.get("token");
  const response = await axios.get(
    "https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/classes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

// Define the async thunk to fetch subjects based on classId
export const fetchSubjects = createAsyncThunk(
  "data/fetchSubjects",
  async (classId) => {
    const token = Cookies.get("token");
    const response = await axios.get(
      `https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/subjects/${classId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Define the async thunk to fetch chapters based on subjectId
export const fetchChapters = createAsyncThunk(
  "data/fetchChapters",
  async (subjectId) => {
    const token = Cookies.get("token");
    const response = await axios.get(
      `https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/chapters/subject/${subjectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
export const fetchLearnerOutcome = createAsyncThunk(
  "data/fetchLearnerOutcome",
  async (chapterId) => {
    const token = Cookies.get("token");
    const response = await axios.get(
      `https://us-central1-firecmsdemo.cloudfunctions.net/qbank/learning-outcome/chapter/${chapterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("line 65 slice",response.data);
    return response.data;
  }
);

const initialState = {
  classes: [],
  subjects: [],
  chapters: [],
  learnerOutcomes: [],
  status: "idle", // 'loading', 'succeeded', or 'failed'
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Optional: You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchChapters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chapters = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLearnerOutcome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLearnerOutcome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.learnerOutcomes = action.payload;
      })
      .addCase(fetchLearnerOutcome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
