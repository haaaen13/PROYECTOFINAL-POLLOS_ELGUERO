function DashboardProductosTop({ data }) {
  return (
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <h3>Productos más vendidos</h3>
      </div>

      <div className="dashboard-list">
        {data.map((producto, index) => (
          <div className="dashboard-list-item" key={index}>
            <div>
              <strong>{producto.producto}</strong>
            </div>

            <span>{producto.cantidadVendida}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardProductosTop;
