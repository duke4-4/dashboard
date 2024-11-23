import Login from "./Login";
import Dashboard from "./Dashboard";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import AdminHome from './pages/AdminHome';
import AdminParcels from './pages/admin/AdminParcels';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminTracking from './pages/admin/AdminTracking';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';
import { ParcelProvider } from './context/ParcelContext';

const initializeUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users"));

  if (!existingUsers) {
    const sampleUsers = [
      { email: "admin@example.com", password: "Admin@1234", role: "admin" },
      { email: "user@example.com", password: "User@1234", role: "user" },
    ];

    localStorage.setItem("users", JSON.stringify(sampleUsers));
  }
};

initializeUsers();

const App = () => {
  return (
    <ParcelProvider>
      <Router >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/admin-dashboard" element={<AdminHome />} />
          <Route path="/admin-dashboard/parcels" element={<AdminParcels />} />
          <Route path="/admin-dashboard/customers" element={<AdminCustomers />} />
          <Route path="/admin-dashboard/tracking" element={<AdminTracking />} />
          <Route path="/admin-dashboard/reports" element={<AdminReports />} />
          <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
        </Routes>
      </Router>
    </ParcelProvider>
  );
};

export default App;
