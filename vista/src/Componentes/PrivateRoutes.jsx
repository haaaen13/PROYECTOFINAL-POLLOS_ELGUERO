import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

export function PrivateAdminRoute() {
  const token = useSelector((state) => state.auth.token);

  const usuario = useSelector((state) => state.auth.usuario);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (usuario?.role !== "Admin") {
    return <Navigate to="/pos" />;
  }

  return <Outlet />;
}

export function PrivateEmpleadoRoute() {
  const token = useSelector((state) => state.auth.token);

  const usuario = useSelector((state) => state.auth.usuario);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (usuario?.role !== "Empleado" && usuario?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
