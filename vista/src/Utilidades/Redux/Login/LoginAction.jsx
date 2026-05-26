import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../middleware";

export const iniciarSesion = createAsyncThunk(
  "auth/login",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const cerrarSesion = createAsyncThunk(
  "auth/logout",

  async (_, { fulfillWithValue }) => {
    return fulfillWithValue();
  },
);
