import React from 'react';

function AdminTracking() {
  const trackingData = [
    { id: 1, reference: 'REF123', location: 'Warehouse A', status: 'In Transit', lastUpdate: '2 hours ago' },
    { id: 2, reference: 'REF456', location: 'Delivery Hub B', status: 'Out for Delivery', lastUpdate: '1 hour ago' },
    { id: 3, reference: 'REF789', location: 'Branch C', status: 'Pending', lastUpdate: '30 mins ago' },
  ];

  return (
    <div className="main-container">
      <div className="main-title">
        <h3 className="font-bold">TRACKING MANAGEMENT</h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by reference number..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Current Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Last Update</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trackingData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.reference}</td>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'Out for Delivery' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.lastUpdate}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">Update</button>
                    <button className="text-green-500 hover:text-green-700">Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminTracking; 