function DashboardUltimasVentas({ data }) {
  return (
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <h3>Últimas ventas</h3>
      </div>

      <div className="dashboard-list">
        {data.map((venta) => (
          <div className="dashboard-list-item" key={venta.id}>
            <div>
              <strong>Venta #{venta.id}</strong>

              <p>{venta.empleado}</p>
            </div>

            <div className="dashboard-sale-right">
              <strong>${Number(venta.total).toFixed(2)}</strong>

              <span>{new Date(venta.fechaVenta).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardUltimasVentas;
