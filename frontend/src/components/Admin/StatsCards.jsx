import "./StatsCards.css";

export function StatsCards({ total, available, categories }) {
  const stats = [
    { label: "Total items", value: total, icon: "🍽️" },
    { label: "Available now", value: available, icon: "✅" },
    { label: "Categories", value: categories, icon: "🏷️" },
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-card-icon" aria-hidden="true">{stat.icon}</span>
          <div>
            <p className="stat-card-value">{stat.value}</p>
            <p className="stat-card-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
