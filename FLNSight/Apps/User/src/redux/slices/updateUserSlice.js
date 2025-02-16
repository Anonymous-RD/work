import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to update a user by ID
export const updateUser = createAsyncThunk(
  "allUsers/updateUser",
  async ({ id, userData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://us-central1-firecmsdemo.cloudfunctions.net/userdetails/${id}`,
        userData, // Data to update the user
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in Authorization header
          },
        }
      );

      console.log("Update User Response: ", response);

      // Return the updated user data
      return response.status;
    } catch (error) {
      console.error("Error updating user: ", error);

      // Reject with server error message or fallback to a generic error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing user updates
const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    updatedUser: null, // Holds the updated user data
    loading: false,
    error: null,
  },
  reducers: {
    resetUpdate: (state) => {
      state.updatedUser = null; // Reset the updated user data
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatedUser = action.payload; // Set the updated user data
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user.";
      });
  },
});

// Export actions and reducer
export const { resetUpdate } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;
