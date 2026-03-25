function DashboardStatCard({ title, value, description, accentClass }) {
  return (
    <article className={`card border-0 shadow-sm h-100 dashboard-stat-card ${accentClass}`}>
      <div className="card-body p-4">
        <span className="dashboard-stat-label">{title}</span>
        <strong className="dashboard-stat-value d-block mt-2">{value}</strong>
        <p className="dashboard-stat-description mb-0 mt-3">{description}</p>
      </div>
    </article>
  );
}

export default DashboardStatCard;
