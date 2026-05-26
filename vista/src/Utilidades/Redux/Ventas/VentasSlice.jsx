// VentasSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
  listarVentas,
  buscarVenta,
  agregarVenta,
  cancelarVenta,
  listarMisVentas,
} from "./VentasAction";

const initialState = {
  Ventas: [],
  Venta: {},
  loading: false,
  error: null,
};

const VentasSlice = createSlice({
  name: "Ventas",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
        LISTAR
      */

      .addCase(listarVentas.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarVentas.fulfilled, (state, action) => {
        state.loading = false;

        state.Ventas = action.payload;
      })

      .addCase(listarVentas.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        BUSCAR
      */

      .addCase(buscarVenta.pending, (state) => {
        state.loading = true;
      })

      .addCase(buscarVenta.fulfilled, (state, action) => {
        state.loading = false;

        state.Venta = action.payload;
      })

      .addCase(buscarVenta.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        AGREGAR
      */

      .addCase(agregarVenta.pending, (state) => {
        state.loading = true;
      })

      .addCase(agregarVenta.fulfilled, (state, action) => {
        state.loading = false;

        state.Venta = action.payload;

        state.Ventas.unshift(action.payload);
      })

      .addCase(agregarVenta.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        CANCELAR
      */

      .addCase(cancelarVenta.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelarVenta.fulfilled, (state, action) => {
        state.loading = false;

        state.Ventas = state.Ventas.map((venta) =>
          venta.id === action.payload
            ? {
                ...venta,
                cancelada: true,
              }
            : venta,
        );

        if (state.Venta?.id === action.payload) {
          state.Venta.cancelada = true;
        }
      })

      .addCase(cancelarVenta.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(listarMisVentas.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarMisVentas.fulfilled, (state, action) => {
        state.loading = false;

        state.Ventas = action.payload;
      })

      .addCase(listarMisVentas.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      });
  },
});

export const VentasReducer = VentasSlice.reducer;
