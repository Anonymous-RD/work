import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/",
});

// Async Thunks

// Fetch all activities
export const fetchActivities = createAsyncThunk(
  "activity/activities-with-status/",
  async ({ outputId, state }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.get(`/activity/activities-with-status?outputId=${outputId}&stateId=${state}`);
      return response.data;
    } catch (error)
    {
      console.error("Error in fetchActivities:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch states
export const fetchStates = createAsyncThunk(
  "activity/fetchStates",
  async (_, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.get("/state/");
      return response.data;
    } catch (error)
    {
      console.error("Error in fetchStates:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



// Fetch activities by output
export const fetchActivitiesByOutput = createAsyncThunk(
  "activity/fetchByOutput",
  async ({ outputId, state, year, quarter }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.get(
        `/activity/by-output?outputId=${outputId}&state=${state}&year=${year}&quarter=${quarter}`
      );
      return response.data;
    } catch (error)
    {
      console.error("Error in fetchActivitiesByOutput:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new activity
export const createActivity = createAsyncThunk(
  "activity/create",
  async (newActivity, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.post("/activity/", newActivity);
      return response.data;
    } catch (error)
    {
      console.error("Error in createActivity:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an activity
export const updateActivity = createAsyncThunk(
  "activity/update",
  async ({ id, updatedData }, { rejectWithValue }) =>
  {
    if (!id || !updatedData)
    {
      return rejectWithValue("Invalid data: missing id or updatedData");
    }

    try
    {
      const response = await axiosInstance.patch(`/activity/${id}`, updatedData);
      return response.data;
    } catch (error)
    {
      console.error("Error in updateActivity:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete an activity
export const deleteActivity = createAsyncThunk(
  "activity/delete",
  async (id, { rejectWithValue }) =>
  {
    try
    {
      await axiosInstance.delete(`/activity/${id}`);
      return id;
    } catch (error)
    {
      console.error("Error in deleteActivity:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Activity status 

// Fetch all activity statuses
export const GetAllActivityStatuses = createAsyncThunk(
    "/activity/activities-with-status/",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/activity/activities-with-status/");
        return response.data;
      } catch (error) {
        console.error("Error in fetchActivityStatuses:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  // Create a new activity status
  export const createActivityStatus = createAsyncThunk(
    "activityStatus/create",
    async (newStatus, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/activitystatus/", newStatus);
        return response.data;
      } catch (error) {
        console.error("Error in createActivityStatus:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  // Update an activity status
  // export const updateActivityStatus = createAsyncThunk(
  //   "activityStatus/update",
  //   async ({ id, updatedData }, { rejectWithValue }) => {
  //     try {
  //       const response = await axiosInstance.patch(`/activitystatus/update/${id}`, updatedData);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error in updateActivityStatus:", error.response?.data || error.message);
  //       return rejectWithValue(error.response?.data || error.message);
  //     }
  //   }
  // );
  
  // Delete an activity status
  export const deleteActivityStatus = createAsyncThunk(
    "activityStatus/delete",
    async (id, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`/activitystatus/delete/${id}`);
        return id;
      } catch (error) {
        console.error("Error in deleteActivityStatus:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
export const fetchActivityStatuses = createAsyncThunk(
  "activityStatus/fetchAll",
  async (_, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.get("/activitystatus/");
      return response.data;
    } catch (error)
    {
      console.error("Error in fetchActivityStatuses:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// // Create a new activity status
// export const createActivityStatus = createAsyncThunk(
//   "activityStatus/create",
//   async (newStatus, { rejectWithValue }) =>
//   {
//     try
//     {
//       const response = await axiosInstance.post("/activitystatus/", newStatus);
//       return response.data;
//     } catch (error)
//     {
//       console.error("Error in createActivityStatus:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// Update an activity status
export const updateActivityStatus = createAsyncThunk(
  "activitystatus/activity-status",
  async ({ updatedData }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.post(`/activitystatus/activity-status/`, updatedData);
      console.log("////", response.data);
      return response.data;
    } catch (error)
    {
      console.error("Error in updateActivityStatus:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// // Delete an activity status
// export const deleteActivityStatus = createAsyncThunk(
//   "activityStatus/delete",
//   async (id, { rejectWithValue }) =>
//   {
//     try
//     {
//       await axiosInstance.delete(`/activitystatus/delete/${id}`);
//       return id;
//     } catch (error)
//     {
//       console.error("Error in deleteActivityStatus:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// Slice
const activitySlice = createSlice({
  name: "activity",
  initialState: { activities: [], activityStatuses: [], states: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) =>
  {
    builder
      // Fetch all activities
      .addCase(fetchActivities.fulfilled, (state, action) =>
      {
        console.log("Fetched Activities:", action.payload); // Log the payload
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      .addCase(fetchStates.pending, (state) =>
      {
        state.status = "loading";
      })
      .addCase(fetchStates.fulfilled, (state, action) =>
      {
        state.status = "succeeded";
        state.states = action.payload.data; // Assuming `data` contains the array of states
      })
      .addCase(fetchStates.rejected, (state, action) =>
      {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch activities by output
      .addCase(fetchActivitiesByOutput.fulfilled, (state, action) =>
      {
        state.activities = action.payload;
      })
      .addCase(fetchActivitiesByOutput.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Create an activity
      .addCase(createActivity.fulfilled, (state, action) =>
      {
        state.activities.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Update an activity
      // .addCase(updateActivity.fulfilled, (state, action) => {
      //   const index = state.activities.findIndex((activity) => activity._id === action.payload._id);
      //   if (index !== -1) state.activities[index] = action.payload;
      // })
      // .addCase(updateActivity.fulfilled, (state, action) => {
      //   console.log("Updated activity payload:", action.payload);
      .addCase(updateActivity.fulfilled, (state, action) =>
      {
        const index = state.activities.findIndex((activity) => activity._id === action.payload._id);
        if (index !== -1) {
          state.activities[index] = action.payload;
          console.log("Updated state.activities:", state.activities);
        }
      })
      .addCase(updateActivity.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Delete an activity
      .addCase(deleteActivity.fulfilled, (state, action) =>
      {
        state.activities = state.activities.filter((activity) => activity._id !== action.payload);
      })
      .addCase(deleteActivity.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Fetch all activity statuses
      // .addCase(GetAllActivityStatuses.fulfilled, (state, action) => {
      .addCase(fetchActivityStatuses.fulfilled, (state, action) =>
      {
        state.activityStatuses = action.payload;
      })
      // .addCase(GetAllActivityStatuses.rejected, (state, action) => {
      .addCase(fetchActivityStatuses.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Create an activity status
      .addCase(createActivityStatus.fulfilled, (state, action) =>
      {
        state.activityStatuses.push(action.payload);
      })
      .addCase(createActivityStatus.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Update an activity status
      .addCase(updateActivityStatus.fulfilled, (state, action) =>
      {
        const index = state.activityStatuses.findIndex(
          (status) => status._id === action.payload._id
        );
        if (index !== -1) state.activityStatuses[index] = action.payload;
      })
      .addCase(updateActivityStatus.rejected, (state, action) =>
      {
        state.error = action.payload;
      })
      // Delete an activity status
      .addCase(deleteActivityStatus.fulfilled, (state, action) =>
      {
        state.activityStatuses = state.activityStatuses.filter(
          (status) => status._id !== action.payload
        );
      })
      .addCase(deleteActivityStatus.rejected, (state, action) =>
      {
        state.error = action.payload;
      });
  },
});

export default activitySlice.reducer;
