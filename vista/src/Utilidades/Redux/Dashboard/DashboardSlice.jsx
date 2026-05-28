import { createSlice } from "@reduxjs/toolkit";

import { obtenerDashboard } from "./DashboardAction";

const initialState = {
  dashboard: {
    ventasHoy: 0,
    numeroVentasHoy: 0,
    productosActivos: 0,
    empleadosActivos: 0,
    sucursalesActivas: 0,
    ticketPromedio: 0,

    ventasPorDia: [],

    metodosPago: [],

    productosTop: [],

    ultimasVentas: [],
  },

  loading: false,

  error: null,
};

const DashboardSlice = createSlice({
  name: "Dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(obtenerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(obtenerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Error al cargar dashboard";
      });
  },
});

export const DashboardReducer = DashboardSlice.reducer;
