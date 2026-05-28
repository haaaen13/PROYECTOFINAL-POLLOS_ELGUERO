import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";


import Login from "./Componentes/Login";
import Layout from "./Componentes/Layout/Layout";

//Admin
import Empleados from "./Componentes/Empleados";
import Productos from "./Componentes/Productos/Productos";
import Sucursales from "./Componentes/Sucursales/Sucursales";
import Ventas from "./Componentes/Ventas/Ventas";
import TurnosActivos from "./Componentes/TurnosActivos/TurnosActivos";

//Empleado
import PosContainer from "./Componentes/POS/PosContainer";
import MisVentas from "./Componentes/MisVentas/MisVentas";
import MisMovimientos from "./Componentes/MisMovimientos/MisMovimientos";
import CierreCaja from "./Componentes/Cierre/CierreCaja";
import Dashboard from "./Componentes/Dashboard/Dashboard";

import {
  PrivateAdminRoute,
  PrivateEmpleadoRoute,
} from "./Componentes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="*" element={<Navigate to="/" />} />

      <Route element={<PrivateAdminRoute />}>
        <Route element={<Layout />}>
          <Route path="/ventas" element={<Ventas />} />

          <Route path="/turnos" element={<TurnosActivos />} />

          <Route path="/empleados" element={<Empleados />} />

          <Route path="/productos" element={<Productos />} />

          <Route path="/sucursales" element={<Sucursales />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* RUTAS EMPLEADO */}

      <Route element={<PrivateEmpleadoRoute />}>
        <Route element={<Layout />}>
          <Route path="/pos" element={<PosContainer />} />

          <Route path="/mis-ventas" element={<MisVentas />} />

          <Route path="/caja" element={<MisMovimientos />} />

          <Route path="/cierre" element={<CierreCaja />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
