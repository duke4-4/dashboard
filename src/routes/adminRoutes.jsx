import { lazy } from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import AdminSidebar from '../components/admin/AdminSidebar';

// Lazy load admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminParcels = lazy(() => import('../pages/admin/AdminParcels'));
const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
const AdminTracking = lazy(() => import('../pages/admin/AdminTracking'));
const AdminReports = lazy(() => import('../pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));

const adminRoutes = [
  {
    path: '/admin',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminDashboard />
      </DashboardLayout>
    )
  },
  {
    path: '/admin/parcels',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminParcels />
      </DashboardLayout>
    )
  },
  {
    path: '/admin/customers',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminCustomers />
      </DashboardLayout>
    )
  },
  {
    path: '/admin/tracking',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminTracking />
      </DashboardLayout>
    )
  },
  {
    path: '/admin/reports',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminReports />
      </DashboardLayout>
    )
  },
  {
    path: '/admin/settings',
    element: (
      <DashboardLayout userType="admin" sidebar={AdminSidebar}>
        <AdminSettings />
      </DashboardLayout>
    )
  }
];

export default adminRoutes; 