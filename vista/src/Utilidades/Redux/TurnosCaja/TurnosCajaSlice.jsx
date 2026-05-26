// TurnosCajaSlice.js

import { createSlice } from "@reduxjs/toolkit";

import {
  obtenerTurnoActivo,
  abrirTurno,
  listarTurnosActivos,
} from "./TurnosCajaAction";

const initialState = {
  TurnoActivo: null,
  TurnosActivos: [],
  loading: false,
  error: null,
};

const TurnosCajaSlice = createSlice({
  name: "TurnosCaja",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
        OBTENER TURNO
      */

      .addCase(obtenerTurnoActivo.pending, (state) => {
        state.loading = true;
      })

      .addCase(obtenerTurnoActivo.fulfilled, (state, action) => {
        state.loading = false;

        state.TurnoActivo = action.payload;
      })

      .addCase(obtenerTurnoActivo.rejected, (state) => {
        state.loading = false;

        state.TurnoActivo = null;
      })

      /*
        ABRIR TURNO
      */

      .addCase(abrirTurno.pending, (state) => {
        state.loading = true;
      })

      .addCase(abrirTurno.fulfilled, (state, action) => {
        state.loading = false;
        state.TurnoActivo = action.payload;
      })

      .addCase(abrirTurno.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(listarTurnosActivos.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarTurnosActivos.fulfilled, (state, action) => {
        state.loading = false;
        state.TurnosActivos = action.payload;
      })

      .addCase(listarTurnosActivos.rejected, (state) => {
        state.loading = false;
        state.TurnoActivo = null;
      });
  },
});

export const TurnosCajaReducer = TurnosCajaSlice.reducer;
