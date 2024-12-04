import PropTypes from 'prop-types';
import {
  BsGrid3X3GapFill,
  BsBoxSeam,
  BsPeopleFill,
  BsClockHistory,
  BsBarChartFill,
  BsGearFill
} from 'react-icons/bs';
import DashboardSidebar from '../shared/DashboardSidebar';

const adminNavItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: BsGrid3X3GapFill
  },
  {
    path: '/admin/parcels',
    label: 'Parcels',
    icon: BsBoxSeam
  },
  {
    path: '/admin/customers',
    label: 'Customers',
    icon: BsPeopleFill
  },
  {
    path: '/admin/tracking',
    label: 'Tracking',
    icon: BsClockHistory
  },
  {
    path: '/admin/reports',
    label: 'Reports',
    icon: BsBarChartFill
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: BsGearFill
  }
];

function AdminSidebar(props) {
  return (
    <DashboardSidebar
      {...props}
      items={adminNavItems}
    />
  );
}

AdminSidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired
};

export default AdminSidebar; 