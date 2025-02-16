// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// src/slices/authSlice.js

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Sign in the user with Firebase
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Extract only the necessary, serializable fields from the user object
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        emailVerified: res.user.emailVerified,
      };

      // Call backend for MFA setup or verification
      const response = await axios.post(
        "https://us-central1-firecmsdemo.cloudfunctions.net/auth/login",
        {
          email,
        }
      );
      console.log(response, res);

      if (response.data.qr_code) {
        return {
          qrCode: response.data.qr_code,
          user: userData,
          mfaSetup: true,
          role: response.data.role,
          verifyOtp: false, // OTP not verified initially
        };
      } else if (response.data.mfaRequired) {
        return {
          mfaRequired: true,
          user: userData,
          mfaSetup: false,
          role: response.data.role,
          verifyOtp: false, // OTP not verified initially
        };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    qrCode: null,
    isMfaSetup: false,
    isMfaVerified: false,
    verifyOtp: false, // New field to track OTP verification
    loading: false,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.qrCode = null;
      state.isMfaSetup = false;
      state.isMfaVerified = false;
      state.verifyOtp = false; // Reset verifyOtp on logout
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    setVerifyOtp: (state, action) => {
      state.verifyOtp = action.payload; // Set OTP verification status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(state.user, action.payload.user, action.payload);

        state.user = JSON.stringify(action.payload); // Contains non-serializable properties
        // localStorage.setItem("user", JSON.stringify(action.payload)); //
        state.qrCode = action.payload.qrCode || null;
        state.isMfaSetup = action.payload.mfaSetup;
        state.isMfaVerified = !action.payload.mfaRequired;
        state.verifyOtp = action.payload.verifyOtp;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState, setVerifyOtp } = authSlice.actions;
export default authSlice.reducer;
