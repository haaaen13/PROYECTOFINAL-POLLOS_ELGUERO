import { createSlice } from "@reduxjs/toolkit";
import {
  agregarEmpleado,
  listarEmpleados,
  editarEmpleado,
  buscarEmpleado,
  eliminarEmpleado,
  toggleEmpleado,
} from "./EmpladosActions";

const initialState = {
  Empleados: [],
  Empleado: {},
  loading: false,
  error: null,
};

const EmpleadosSlice = createSlice({
  name: "Empleados",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarEmpleados.fulfilled, (state, action) => {
        state.loading = false;
        state.Empleados = action.payload;
      })
      .addCase(listarEmpleados.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(agregarEmpleado.pending, (state) => {
        state.loading = true;
      })
      .addCase(agregarEmpleado.fulfilled, (state, action) => {
        state.loading = false;
        state.Empleado = action.payload;
      })
      .addCase(agregarEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(editarEmpleado.pending, (state) => {
        state.loading = true;
      })
      .addCase(editarEmpleado.fulfilled, (state, action) => {
        state.loading = false;
        state.Empleado = action.payload;
      })
      .addCase(editarEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(buscarEmpleado.pending, (state) => {
        state.loading = true;
      })
      .addCase(buscarEmpleado.fulfilled, (state, action) => {
        state.loading = false;
        state.Empleado = action.payload;
      })
      .addCase(buscarEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(eliminarEmpleado.pending, (state) => {
        state.loading = true;
      })
      .addCase(eliminarEmpleado.fulfilled, (state, action) => {
        state.Empleados = state.Empleados.filter(
          (u) => u.id !== action.payload,
        );
      })
      .addCase(eliminarEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(toggleEmpleado.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleEmpleado.fulfilled, (state, action) => {
        state.loading = false;
        state.Empleado = action.payload;
      })
      .addCase(toggleEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const EmpleadosReducer = EmpleadosSlice.reducer;
