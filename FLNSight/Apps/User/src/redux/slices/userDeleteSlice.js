import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to delete a user by ID
export const deleteUser = createAsyncThunk(
  "allUsers/deleteUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://us-central1-firecmsdemo.cloudfunctions.net/userdetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in Authorization header
          },
        }
      );

      console.log("Delete User Response: ", response);

      // Return a success message or response data
      return response.status;
    } catch (error) {
      console.error("Error deleting user: ", error);

      // Reject with server error message or fallback to a generic error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing user deletion
const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {
    status:null,
    successMessage: null, // Holds the success message after deletion
    loading: false,
    error: null, // Holds any error encountered
  },
  reducers: {
    resetDelete: (state) => {
      state.status=null,
      state.successMessage = null; // Reset the success message
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status="Deleted successfully"
        state.successMessage = action.payload.message; // Set the success message
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status=null;
        state.loading = false;
        state.error = action.payload || "Failed to delete user.";
      });
  },
});

// Export actions and reducer
export const { resetDelete } = userDeleteSlice.actions;

export default userDeleteSlice.reducer;
