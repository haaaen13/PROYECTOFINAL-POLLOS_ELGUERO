import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../middleware";

export const listarEmpleados = createAsyncThunk(
  "empleados/listar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/empleados");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const buscarEmpleado = createAsyncThunk(
  "empleados/buscar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/empleados/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const agregarEmpleado = createAsyncThunk(
  "empleados/agregar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/empleados", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const eliminarEmpleado = createAsyncThunk(
  "empleados/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/empleados/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editarEmpleado = createAsyncThunk(
  "empleados/editar",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/empleados/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const toggleEmpleado = createAsyncThunk(
  "empleados/habilitar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/empleados/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
