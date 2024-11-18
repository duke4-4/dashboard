import React, { useState } from 'react';
import AdminDashboard from '../AdminDashboard';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

function AdminHome() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={OpenSidebar} />
      <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <AdminDashboard />
      </main>
    </div>
  );
}

export default AdminHome; 