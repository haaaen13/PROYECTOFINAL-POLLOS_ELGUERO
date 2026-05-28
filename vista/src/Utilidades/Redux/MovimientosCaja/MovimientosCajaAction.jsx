import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../middleware";

export const listarMovimientosCaja = createAsyncThunk(
  "movimientosCaja/listar",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MovimientosCaja");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const listarMisMovimientos = createAsyncThunk(
  "movimientosCaja/misMovimientos",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MovimientosCaja/mis-movimientos");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const crearMovimientoCaja = createAsyncThunk(
  "movimientosCaja/crear",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/MovimientosCaja", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
