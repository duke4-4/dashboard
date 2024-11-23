import React, { useState } from 'react';
import Header from '../../Header';
import ReceiverSidebar from '../../components/ReceiverSidebar';

function ReceiverSettings() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <ReceiverSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      
      <main className='main-container'>
        <div className='main-title'>
          <h3 className='font-bold'>SETTINGS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded" 
                  defaultValue="receiver@example.com"
                  readOnly 
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-[#FF8227] text-white px-4 py-2 rounded hover:bg-[#db9600]">
                Update Profile
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Security Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-[#FF8227] text-white px-4 py-2 rounded hover:bg-[#db9600]">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReceiverSettings; 