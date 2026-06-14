import { Link } from "react-router-dom";

const modules = [
  { name: "Fetch Update", path: "/fetch-update", desc: "Run system update workflow" },
  { name: "Log Backup", path: "/log-backup", desc: "Archive system logs" },
  { name: "Log Cleanup", path: "/log-cleanup", desc: "Clean expired logs" },
  { name: "TLS Compliance", path: "/tls-compliance", desc: "Check security configs" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="text-page-title">Dashboard</h1>
        <p className="text-section-title-dashboard">
            Application Support Operations and Automation Portal
        </p>
      </div>

      {/* CENTER GRID */}
      <div className="dashboard-grid">

        {modules.map((item) => (
          <Link key={item.name} to={item.path} className="dashboard-card">

            <div className="text-card-title-dashboard">
              {item.name}
            </div>

            <div className="dashboard-card-description">
              {item.desc}
            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}