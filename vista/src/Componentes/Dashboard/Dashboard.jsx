// Dashboard.jsx

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { obtenerDashboard } from "../../Utilidades/Redux/Dashboard/DashboardAction";

import DashboardCard from "./DashboardCard";

import DashboardVentasChart from "./DashboardVentasChart";

import DashboardMetodosPago from "./DashboardMetodosPago";

import DashboardProductosTop from "./DashboardProductosTop";

import DashboardUltimasVentas from "./DashboardUltimasVentas";

import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();

  const { dashboard, loading } = useSelector((store) => store.dashboard);

  useEffect(() => {
    dispatch(obtenerDashboard());
  }, [dispatch]);

  if (loading) {
    return <div className="dashboard-loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>Resumen general del sistema</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <DashboardCard
          title="Ventas hoy"
          value={`$${Number(dashboard?.ventasHoy || 0).toFixed(2)}`}
        />

        <DashboardCard
          title="Ventas realizadas"
          value={dashboard?.numeroVentasHoy || 0}
        />

        <DashboardCard
          title="Productos activos"
          value={dashboard?.productosActivos || 0}
        />

        <DashboardCard
          title="Empleados activos"
          value={dashboard?.empleadosActivos || 0}
        />

        <DashboardCard
          title="Sucursales activas"
          value={dashboard?.sucursalesActivas || 0}
        />

        <DashboardCard
          title="Ticket promedio"
          value={`$${Number(dashboard?.ticketPromedio || 0).toFixed(2)}`}
        />
      </div>

      <div className="dashboard-grid">
        <DashboardVentasChart data={dashboard?.ventasPorDia || []} />

        <DashboardMetodosPago data={dashboard?.metodosPago || []} />
      </div>

      <div className="dashboard-grid">
        <DashboardProductosTop data={dashboard?.productosTop || []} />

        <DashboardUltimasVentas data={dashboard?.ultimasVentas || []} />
      </div>
    </div>
  );
}

export default Dashboard;
