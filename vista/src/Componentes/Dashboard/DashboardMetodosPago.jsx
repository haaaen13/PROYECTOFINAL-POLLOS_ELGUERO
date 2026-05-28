import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#111827", "#374151", "#6b7280"];

function DashboardMetodosPago({ data }) {
  return (
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <h3>Métodos de pago</h3>
      </div>

      <div className="dashboard-chart">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="metodo" outerRadius={110}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardMetodosPago;
