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

export const fetchDistricts = createAsyncThunk(
  "district/fetch",
  async () => {
    const response = await axiosInstance.get("/districts");
    return response.data;
  }
);

export const createDistrict = createAsyncThunk(
  "district/create",
  async (newDistrict) => {
    const response = await axiosInstance.post("/districts", newDistrict);
    return response.data;
  }
);


export const createDistrictsBulk = createAsyncThunk(
  "district/createBulk", 
  async ({checkField, datas}) => {
    const payload = {
      checkField,
      datas,
    }
    const response = await axiosInstance.post("/districts/bulk", payload);
    return response.data.results.map((result) => result.data);
  }
);

export const updateDistrict = createAsyncThunk(
  "district/update",
  async ({ id, updatedData }) => {
    const response = await axiosInstance.patch(`/districts/${id}`, updatedData);
    return response.data;
  }
);

export const deleteDistrict = createAsyncThunk(
  "district/delete",
  async (id) => {
    await axiosInstance.delete(`/districts/${id}`);
    return id;
  }
);

const districtSlice = createSlice({
  name: "district",
  initialState: { districts: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })
      .addCase(createDistrict.fulfilled, (state, action) => {
        state.districts.push(action.payload);
      })
      .addCase(createDistrictsBulk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.districts = [...state.districts, ...action.payload]; // Add all new districts to the list
        } else {
          console.error("Invalid payload format:", action.payload);
        }
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        const index = state.districts.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.districts[index] = action.payload;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.districts = state.districts.filter((district) => district._id !== action.payload);
      });
  },
});

export default districtSlice.reducer;
