import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../middleware";

export const listarSucursales = createAsyncThunk(
  "sucursales/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sucursal");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const buscarSucursal = createAsyncThunk(
  "sucursales/buscar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sucursal/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const agregarSucursal = createAsyncThunk(
  "sucursales/agregar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/sucursal", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const eliminarSucursal = createAsyncThunk(
  "sucursales/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/sucursal/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editarSucursal = createAsyncThunk(
  "sucursales/editar",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/sucursal/${id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const toggleSucursal = createAsyncThunk(
  "sucursales/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/sucursal/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
