import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  "userdetails/fetchUserDetails",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://us-central1-firecmsdemo.cloudfunctions.net/userdetails",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      console.log(response);

      // Return only the necessary user details
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const userdetailsSlice = createSlice({
  name: "userdetails",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("token"); // Remove token from cookies on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload; // Store user details in Redux state
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userdetailsSlice.actions;

export default userdetailsSlice.reducer;
