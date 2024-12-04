import { lazy } from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import SenderSidebar from '../components/sender/SenderSidebar';

// Lazy load sender pages
const SenderDashboard = lazy(() => import('../pages/sender/SenderDashboard'));
const SenderHistory = lazy(() => import('../pages/sender/SenderHistory'));
const SenderTracking = lazy(() => import('../pages/sender/SenderTracking'));
const SenderSettings = lazy(() => import('../pages/sender/SenderSettings'));

const senderRoutes = [
  {
    path: '/sender',
    element: (
      <DashboardLayout userType="sender" sidebar={SenderSidebar}>
        <SenderDashboard />
      </DashboardLayout>
    )
  },
  {
    path: '/sender/history',
    element: (
      <DashboardLayout userType="sender" sidebar={SenderSidebar}>
        <SenderHistory />
      </DashboardLayout>
    )
  },
  {
    path: '/sender/track',
    element: (
      <DashboardLayout userType="sender" sidebar={SenderSidebar}>
        <SenderTracking />
      </DashboardLayout>
    )
  },
  {
    path: '/sender/settings',
    element: (
      <DashboardLayout userType="sender" sidebar={SenderSidebar}>
        <SenderSettings />
      </DashboardLayout>
    )
  }
];

export default senderRoutes; 