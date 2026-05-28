import { createSlice } from "@reduxjs/toolkit";

import {
  obtenerResumenCierre,
  cerrarCaja,
  listarMisCierres,
  listarCierres,
  buscarCierre,
} from "./CierreCajaActions";

const initialState = {
  Cierres: [],
  Cierre: {},
  Resumen: {},
  loading: false,
  error: null,
};

const CierreCajaSlice = createSlice({
  name: "CierreCaja",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(obtenerResumenCierre.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerResumenCierre.fulfilled, (state, action) => {
        state.loading = false;

        state.Resumen = action.payload;
      })
      .addCase(obtenerResumenCierre.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(cerrarCaja.pending, (state) => {
        state.loading = true;
      })
      .addCase(cerrarCaja.fulfilled, (state, action) => {
        state.loading = false;

        state.Cierre = action.payload;
      })
      .addCase(cerrarCaja.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(listarMisCierres.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarMisCierres.fulfilled, (state, action) => {
        state.loading = false;

        state.Cierres = action.payload;
      })
      .addCase(listarMisCierres.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(listarCierres.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarCierres.fulfilled, (state, action) => {
        state.loading = false;

        state.Cierres = action.payload;
      })
      .addCase(listarCierres.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(buscarCierre.pending, (state) => {
        state.loading = true;
      })
      .addCase(buscarCierre.fulfilled, (state, action) => {
        state.loading = false;

        state.Cierre = action.payload;
      })
      .addCase(buscarCierre.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      });
  },
});

export const CierreCajaReducer = CierreCajaSlice.reducer;
