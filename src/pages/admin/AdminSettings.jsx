import React from 'react';

function AdminSettings() {
  return (
    <div className="main-container">
      <div className="main-title">
        <h3 className="font-bold">SETTINGS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">System Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">System Email</label>
              <input type="email" className="w-full p-2 border rounded" defaultValue="system@example.com" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Notification Preferences</label>
              <select className="w-full p-2 border rounded">
                <option>All Notifications</option>
                <option>Important Only</option>
                <option>None</option>
              </select>
            </div>
            <button className="bg-[#FF8227] text-white px-4 py-2 rounded hover:bg-[#db9600]">
              Save Changes
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
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings; 