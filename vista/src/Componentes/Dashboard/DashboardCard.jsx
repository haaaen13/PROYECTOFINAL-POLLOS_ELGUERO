// DashboardCard.jsx

function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <span className="dashboard-card-title">{title}</span>

      <strong className="dashboard-card-value">{value}</strong>
    </div>
  );
}

export default DashboardCard;
