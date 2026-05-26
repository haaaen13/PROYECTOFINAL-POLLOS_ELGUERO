// VentasAction.js

import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../middleware";

/*
  LISTAR
*/

export const listarVentas = createAsyncThunk(
  "ventas/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/ventas");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/*
  BUSCAR
*/

export const buscarVenta = createAsyncThunk(
  "ventas/buscar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ventas/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/*
  AGREGAR
*/

export const agregarVenta = createAsyncThunk(
  "ventas/agregar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/ventas", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/*
  CANCELAR
*/

export const cancelarVenta = createAsyncThunk(
  "ventas/cancelar",
  async (id, { rejectWithValue }) => {
    try {
      await api.patch(`/ventas/cancelar/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const listarMisVentas = createAsyncThunk(
  "mis-ventas/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/ventas/mis-ventas");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
