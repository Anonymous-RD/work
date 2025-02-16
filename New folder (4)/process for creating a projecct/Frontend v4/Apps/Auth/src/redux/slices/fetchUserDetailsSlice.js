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
      console.log("2-", response);

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
      const mainDomain = new URL(window.location.href).hostname; // auth-fln.apie.in | localhost
      const rootDomain = mainDomain.split(".").slice(-2).join("."); // apie.in | localhost
      console.log("rootDomain: ", rootDomain);
      if (rootDomain === "localhost") {
        Cookies.remove("token", {
          domain: "." + rootDomain, // .localhost
          path: "/",
        });
      } else {
        Cookies.remove("token", {
          domain: "." + rootDomain, // .apie.in
          path: "/",
          secure: true,
          sameSite: "None",
        });
      } // Log to verify removal
      console.log("Token removal attempted for domain: ", rootDomain);
      const token = Cookies.get("token");
      if (!token) {
        console.log("Token successfully removed");
      } else {
        console.log("Token removal failed");
      }
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
