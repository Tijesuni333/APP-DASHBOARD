import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <h2 className="text-section-title">
          Operations Portal
      </h2>

      <ul>
            <li>
              <Link className="text-nav" to="/">
                    Dashboard
              </Link>
            </li>

            <li>
              <Link className="text-nav" to="/fetch-update">
                    Fetch Update
              </Link>
            </li>

            <li>
              <Link className="text-nav" to="/log-backup">
                    Log Backup
              </Link>
            </li>

            <li>
              <Link className="text-nav" to="/log-cleanup">
                    Log Cleanup
              </Link>
            </li>

            <li>
              <Link className="text-nav" to="/tls-compliance">
                    TLS Compliance
              </Link>
            </li>
      </ul>

    </aside>
  );
}