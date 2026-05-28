import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../middleware";

export const obtenerTurnoActivo = createAsyncThunk(
  "turnosCaja/obtenerActivo",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/TurnosCaja/activo");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const abrirTurno = createAsyncThunk(
  "turnosCaja/abrir",

  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/TurnosCaja/abrir", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const listarTurnosActivos = createAsyncThunk(
  "turnosCaja/listar",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/TurnosCaja/abiertos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
