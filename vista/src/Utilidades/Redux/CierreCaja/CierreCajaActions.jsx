import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../middleware";


export const obtenerResumenCierre = createAsyncThunk(
  "cierreCaja/resumen",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cierrescaja/resumen-turno");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const cerrarCaja = createAsyncThunk(
  "cierreCaja/cerrar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/cierrescaja", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const listarMisCierres = createAsyncThunk(
  "cierreCaja/misCierres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cierrescaja/mis-cierres");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const listarCierres = createAsyncThunk(
  "cierreCaja/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cierrescaja");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


export const buscarCierre = createAsyncThunk(
  "cierreCaja/buscar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cierrescaja/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
