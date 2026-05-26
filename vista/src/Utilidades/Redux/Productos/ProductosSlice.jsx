import { createSlice } from "@reduxjs/toolkit";

import {
  agregarProducto,
  listarProductos,
  listarProductosActivos,
  editarProducto,
  buscarProducto,
  eliminarProducto,
  toggleProducto,
} from "./ProductosAction";

const initialState = {
  Productos: [],
  Producto: {},
  loading: false,
  error: null,
};

const ProductosSlice = createSlice({
  name: "Productos",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /*
        LISTAR
      */

      .addCase(listarProductos.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarProductos.fulfilled, (state, action) => {
        state.loading = false;

        state.Productos = action.payload;
      })

      .addCase(listarProductos.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      .addCase(listarProductosActivos.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarProductosActivos.fulfilled, (state, action) => {
        state.loading = false;

        state.Productos = action.payload;
      })

      .addCase(listarProductosActivos.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        AGREGAR
      */

      .addCase(agregarProducto.pending, (state) => {
        state.loading = true;
      })

      .addCase(agregarProducto.fulfilled, (state, action) => {
        state.loading = false;

        state.Producto = action.payload;
      })

      .addCase(agregarProducto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        EDITAR
      */

      .addCase(editarProducto.pending, (state) => {
        state.loading = true;
      })

      .addCase(editarProducto.fulfilled, (state, action) => {
        state.loading = false;

        state.Producto = action.payload;
      })

      .addCase(editarProducto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        BUSCAR
      */

      .addCase(buscarProducto.pending, (state) => {
        state.loading = true;
      })

      .addCase(buscarProducto.fulfilled, (state, action) => {
        state.loading = false;

        state.Producto = action.payload;
      })

      .addCase(buscarProducto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        ELIMINAR
      */

      .addCase(eliminarProducto.pending, (state) => {
        state.loading = true;
      })

      .addCase(eliminarProducto.fulfilled, (state, action) => {
        state.loading = false;

        state.Productos = state.Productos.filter(
          (p) => p.id !== action.payload,
        );
      })

      .addCase(eliminarProducto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      })

      /*
        TOGGLE
      */

      .addCase(toggleProducto.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleProducto.fulfilled, (state, action) => {
        state.loading = false;

        state.Producto = action.payload;
      })

      .addCase(toggleProducto.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error;
      });
  },
});

export const ProductosReducer = ProductosSlice.reducer;
