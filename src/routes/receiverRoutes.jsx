import { lazy } from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import ReceiverSidebar from '../components/receiver/ReceiverSidebar';

// Lazy load receiver pages
const ReceiverDashboard = lazy(() => import('../pages/receiver/ReceiverDashboard'));
const ReceiverHistory = lazy(() => import('../pages/receiver/ReceiverHistory'));
const ReceiverTracking = lazy(() => import('../pages/receiver/ReceiverTracking'));
const ReceiverSettings = lazy(() => import('../pages/receiver/ReceiverSettings'));

const receiverRoutes = [
  {
    path: '/receiver',
    element: (
      <DashboardLayout userType="receiver" sidebar={ReceiverSidebar}>
        <ReceiverDashboard />
      </DashboardLayout>
    )
  },
  {
    path: '/receiver/history',
    element: (
      <DashboardLayout userType="receiver" sidebar={ReceiverSidebar}>
        <ReceiverHistory />
      </DashboardLayout>
    )
  },
  {
    path: '/receiver/track',
    element: (
      <DashboardLayout userType="receiver" sidebar={ReceiverSidebar}>
        <ReceiverTracking />
      </DashboardLayout>
    )
  },
  {
    path: '/receiver/settings',
    element: (
      <DashboardLayout userType="receiver" sidebar={ReceiverSidebar}>
        <ReceiverSettings />
      </DashboardLayout>
    )
  }
];

export default receiverRoutes; 