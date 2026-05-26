import { createSlice } from "@reduxjs/toolkit";

import { iniciarSesion, cerrarSesion } from "../Login/LoginAction";

const initialState = {
  usuario: null,
  token: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(iniciarSesion.pending, (state) => {
        state.loading = true;
      })

      .addCase(iniciarSesion.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;

        state.usuario = action.payload.usuario;

        state.error = null;
      })

      .addCase(iniciarSesion.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })
      .addCase(cerrarSesion.fulfilled, (state) => {
        state.usuario = null;

        state.token = null;

        state.loading = false;

        state.error = null;
      });
  },
});

export const selectToken = (state) => state.auth.token;

export const loginReducer = loginSlice.reducer;
