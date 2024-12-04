import PropTypes from 'prop-types';
import AdminHeader from '../AdminHeader';
import { useState } from 'react';

function DashboardLayout({ children, userType, sidebar: Sidebar }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader OpenSidebar={OpenSidebar} userType={userType} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className="lg:pl-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  userType: PropTypes.oneOf(['admin', 'sender', 'receiver']).isRequired,
  sidebar: PropTypes.elementType.isRequired
};

export default DashboardLayout;