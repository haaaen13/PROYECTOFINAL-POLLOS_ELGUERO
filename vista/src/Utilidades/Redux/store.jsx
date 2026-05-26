import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { setAuthToken } from "../middleware";
import { EmpleadosReducer } from "./Empleados/EmpleadosSlice";
import { ProductosReducer } from "./Productos/ProductosSlice";
import { loginReducer } from "./Login/LoginSlice";
import { TurnosCajaReducer } from "./TurnosCaja/TurnosCajaSlice";
import { SucursalesReducer } from "./Sucursales/SucursalesSlice";
import { VentasReducer } from "./Ventas/VentasSlice";
import { MovimientosCajaReducer } from "./MovimientosCaja/MovimientosCajaSlice";
import { CierreCajaReducer } from "./CierreCaja/CierreCajaSlice";
import { DashboardReducer } from "./Dashboard/DashboardSlice";

/*
    Persist config
*/

const persistConfig = {
  key: "auth",

  storage,

  whitelist: ["token", "usuario"],
};

/*
    Persist reducer
*/

const persisAuthReducer = persistReducer(persistConfig, loginReducer);

/*
    Store
*/

export const store = configureStore({
  reducer: {
    empleados: EmpleadosReducer,
    productos: ProductosReducer,
    sucursales: SucursalesReducer,
    turnosCaja: TurnosCajaReducer,
    ventas: VentasReducer,
    movimientosCaja: MovimientosCajaReducer,
    CierreCaja: CierreCajaReducer,
    dashboard: DashboardReducer,
    auth: persisAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

/*
    Token interceptor
*/

setAuthToken(() => store.getState().auth.token);

/*
    Persistor
*/

export const persistor = persistStore(store);
