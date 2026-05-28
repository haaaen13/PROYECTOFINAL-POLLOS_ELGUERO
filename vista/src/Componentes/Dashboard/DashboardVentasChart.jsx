import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function DashboardVentasChart({ data }) {
  const formattedData = data.map((item) => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString(),
  }));

  return (
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <h3>Ventas últimos 7 días</h3>
      </div>

      <div className="dashboard-chart">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="fecha" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#111827"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardVentasChart;
