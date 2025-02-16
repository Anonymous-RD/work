import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "allUsers/fetchAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://us-central1-styletrends-5dc20.cloudfunctions.net/userdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in Authorization header
          },
        }
      );

      console.log("Fetch All Users Response: ", response);

      // Return the list of all users
      return response.data;
    } catch (error) {
      console.error("Error fetching all users: ", error);

      // Reject with server error message or fallback to a generic error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing all users
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [], // Array to store all users
    selectedUser: null, // New state for selected user
    loading: false,
    error: null,
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.selectedUser = null; // Reset selected user as well
      state.loading = false;
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // Set selected user ID
    },
    resetSelectedUser: (state) => {
      state.selectedUser = null; // Reset selected user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Set users with the API response data
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users.";
      });
  },
});

// Export actions and reducer
export const { resetUsers, setSelectedUser, resetSelectedUser } = allUsersSlice.actions;

export default allUsersSlice.reducer;
