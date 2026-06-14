import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import FetchUpdate from "./pages/FetchUpdate";
import LogBackup from "./pages/LogBackup";
import LogCleanup from "./pages/LogCleanup";
import TLSCompliance from "./pages/TLSCompliance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/fetch-update"
            element={<FetchUpdate />}
          />

          <Route
            path="/log-backup"
            element={<LogBackup />}
          />

          <Route
            path="/log-cleanup"
            element={<LogCleanup />}
          />

          <Route
            path="/tls-compliance"
            element={<TLSCompliance />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;