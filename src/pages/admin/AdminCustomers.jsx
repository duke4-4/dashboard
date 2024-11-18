import React from 'react';

function AdminCustomers() {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', parcels: 5, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', parcels: 3, status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', parcels: 7, status: 'Inactive' },
  ];

  return (
    <div className="main-container">
      <div className="main-title">
        <h3 className="font-bold">CUSTOMERS</h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Total Parcels</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.parcels}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                    <button className="text-red-500 hover:text-red-700">Block</button>
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

export default AdminCustomers; 