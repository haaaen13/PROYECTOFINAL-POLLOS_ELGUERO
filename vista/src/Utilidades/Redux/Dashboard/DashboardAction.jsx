import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../middleware";

export const obtenerDashboard = createAsyncThunk(
  "dashboard/obtener",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
