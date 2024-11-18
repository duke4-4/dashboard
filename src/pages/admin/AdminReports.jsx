import React from 'react';
import { Bar } from 'react-chartjs-2';

function AdminReports() {
  const deliveryData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Deliveries',
        data: [12, 19, 15, 20, 25, 18, 15],
        backgroundColor: '#FF8227',
      },
    ],
  };

  const revenueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [4500, 5200, 4800, 6000],
        backgroundColor: '#2962ff',
      },
    ],
  };

  return (
    <div className="main-container">
      <div className="main-title">
        <h3 className="font-bold">REPORTS & ANALYTICS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Weekly Deliveries</h2>
          <Bar data={deliveryData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-gray-500">Success Rate</h3>
              <p className="text-2xl font-bold text-green-600">95%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-gray-500">Average Delivery Time</h3>
              <p className="text-2xl font-bold text-blue-600">2.3 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Issues</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-red-50 rounded text-red-700">3 delayed deliveries</li>
            <li className="p-2 bg-yellow-50 rounded text-yellow-700">5 pending payments</li>
            <li className="p-2 bg-green-50 rounded text-green-700">12 successful deliveries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminReports; 