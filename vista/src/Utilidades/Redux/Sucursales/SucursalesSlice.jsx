import { createSlice } from "@reduxjs/toolkit";

import {
  agregarSucursal,
  listarSucursales,
  editarSucursal,
  buscarSucursal,
  eliminarSucursal,
  toggleSucursal,
} from "./SucursalesAction";

const initialState = {
  Sucursales: [],
  Sucursal: {},
  loading: false,
  error: null,
};

const SucursalesSlice = createSlice({
  name: "Sucursales",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
        LISTAR
      */

      .addCase(listarSucursales.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarSucursales.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursales = action.payload;
      })

      .addCase(listarSucursales.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        AGREGAR
      */

      .addCase(agregarSucursal.pending, (state) => {
        state.loading = true;
      })

      .addCase(agregarSucursal.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursal = action.payload;
      })

      .addCase(agregarSucursal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        EDITAR
      */

      .addCase(editarSucursal.pending, (state) => {
        state.loading = true;
      })

      .addCase(editarSucursal.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursal = action.payload;
      })

      .addCase(editarSucursal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        BUSCAR
      */

      .addCase(buscarSucursal.pending, (state) => {
        state.loading = true;
      })

      .addCase(buscarSucursal.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursal = action.payload;
      })

      .addCase(buscarSucursal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        ELIMINAR
      */

      .addCase(eliminarSucursal.pending, (state) => {
        state.loading = true;
      })

      .addCase(eliminarSucursal.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursales = state.Sucursales.filter(
          (s) => s.id !== action.payload,
        );
      })

      .addCase(eliminarSucursal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        TOGGLE
      */

      .addCase(toggleSucursal.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleSucursal.fulfilled, (state, action) => {
        state.loading = false;

        state.Sucursal = action.payload;
      })

      .addCase(toggleSucursal.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      });
  },
});

export const SucursalesReducer = SucursalesSlice.reducer;
