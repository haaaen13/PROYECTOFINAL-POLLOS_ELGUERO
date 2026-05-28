import { createSlice } from "@reduxjs/toolkit";

import {
  listarMovimientosCaja,
  listarMisMovimientos,
  crearMovimientoCaja,
} from "./MovimientosCajaAction";

const initialState = {
  MovimientosCaja: [],

  MisMovimientos: [],

  MovimientoCaja: {},

  loading: false,

  error: null,
};

const MovimientosCajaSlice = createSlice({
  name: "movimientosCaja",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(listarMovimientosCaja.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarMovimientosCaja.fulfilled, (state, action) => {
        state.loading = false;
        state.MovimientosCaja = action.payload;
      })
      .addCase(listarMovimientosCaja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(listarMisMovimientos.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarMisMovimientos.fulfilled, (state, action) => {
        state.loading = false;
        state.MisMovimientos = action.payload;
      })
      .addCase(listarMisMovimientos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(crearMovimientoCaja.pending, (state) => {
        state.loading = true;
      })
      .addCase(crearMovimientoCaja.fulfilled, (state, action) => {
        state.loading = false;
        state.MovimientoCaja = action.payload;
      })
      .addCase(crearMovimientoCaja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const MovimientosCajaReducer = MovimientosCajaSlice.reducer;
