import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../middleware";

export const listarProductos = createAsyncThunk(
  "productos/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/Productos");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const listarProductosActivos = createAsyncThunk(
  "productos/activos/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/productos/activos");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const buscarProducto = createAsyncThunk(
  "productos/buscar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/productos/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const agregarProducto = createAsyncThunk(
  "productos/agregar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/productos", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const eliminarProducto = createAsyncThunk(
  "productos/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/productos/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editarProducto = createAsyncThunk(
  "productos/editar",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/productos/${id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const toggleProducto = createAsyncThunk(
  "productos/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/productos/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
