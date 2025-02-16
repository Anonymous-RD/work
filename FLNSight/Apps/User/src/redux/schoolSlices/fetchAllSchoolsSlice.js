import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all users
export const fetchAllSchools = createAsyncThunk(
  "allUsers/fetchAllSchools",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/school",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in Authorization header
          },
        }
      );

      console.log("Fetch All Schools Response: ", response);

      // Return the list of all users
      return response.data;
    } catch (error) {
      console.error("Error fetching all schools ", error);

      // Reject with server error message or fallback to a generic error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing all users
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    schools: [], // Array to store all users
    selectedSchool: null, // New state for selected user
    loading: false,
    error: null,
  },
  reducers: {
    resetSchools: (state) => {
      state.schools = [];
      state.selectedSchool = null; // Reset selected user as well
      state.loading = false;
      state.error = null;
    },
    setSelectedSchool: (state, action) => {
      state.selectedSchool = action.payload; // Set selected user ID
    },
    resetSelectedSchool: (state) => {
      state.selectedSchool = null; // Reset selected user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSchools.fulfilled, (state, action) => {
        state.schools = action.payload; // Set users with the API response data
        state.loading = false;
      })
      .addCase(fetchAllSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users.";
      });
  },
});

// Export actions and reducer
export const { resetSchools, setSelectedSchool, resetSelectedSchool } = allUsersSlice.actions;

export default allUsersSlice.reducer;
