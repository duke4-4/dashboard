import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { useParcels } from './context/ParcelContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { parcels } = useParcels();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    revenue: 0
  });

  const [activeModal, setActiveModal] = useState(null);

  // Calculate statistics
  useEffect(() => {
    const newStats = parcels.reduce((acc, parcel) => ({
      total: acc.total + 1,
      pending: acc.pending + (parcel.status === 'Pending' ? 1 : 0),
      delivered: acc.delivered + (parcel.status === 'Received' ? 1 : 0),
      revenue: acc.revenue + (parcel.paymentStatus === 'Paid' ? parcel.amount : 0)
    }), { total: 0, pending: 0, delivered: 0, revenue: 0 });

    setStats(newStats);
  }, [parcels]);

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [1200, 1900, 1500, 2000, 2500, 2800],
        backgroundColor: '#FF8227',
      },
    ],
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="main-container">
      <div className='main-title'>
        <h3 className='font-bold'>ADMIN DASHBOARD</h3>
      </div>
      
      {/* Stats Cards */}
      <div className="main-cards">
        <div className="card" onClick={() => setActiveModal('parcels')}>
          <div className='card-inner'>
            <h3>TOTAL PARCELS</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
        <div className="card" onClick={() => setActiveModal('pending')}>
          <div className='card-inner'>
            <h3>PENDING DELIVERIES</h3>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
        </div>
        <div className="card" onClick={() => setActiveModal('delivered')}>
          <div className='card-inner'>
            <h3>DELIVERED</h3>
            <p className="text-2xl font-bold">{stats.delivered}</p>
          </div>
        </div>
        <div className="card" onClick={() => setActiveModal('revenue')}>
          <div className='card-inner'>
            <h3>TOTAL REVENUE</h3>
            <p className="text-2xl font-bold">${stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="charts-container">
        <div className="charts-section bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
          <Bar data={revenueData} />
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 style={{color: '#FF8227'}} className="text-2xl font-bold mb-6">
              {activeModal === 'parcels' && 'All Parcels'}
              {activeModal === 'pending' && 'Pending Deliveries'}
              {activeModal === 'delivered' && 'Delivered Parcels'}
              {activeModal === 'revenue' && 'Revenue Details'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#FF8227]">
                    <th className="px-4 py-2 text-white">Reference</th>
                    <th className="px-4 py-2 text-white">Customer</th>
                    <th className="px-4 py-2 text-white">Status</th>
                    <th className="px-4 py-2 text-white">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels
                    .filter(parcel => {
                      if (activeModal === 'pending') return parcel.status === 'Pending';
                      if (activeModal === 'delivered') return parcel.status === 'Received';
                      return true;
                    })
                    .map((parcel) => (
                      <tr key={parcel.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900">{parcel.referenceCode}</td>
                        <td className="px-4 py-2 text-gray-900">{parcel.name}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            parcel.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {parcel.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-900">{parcel.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <button onClick={closeModal} className="mt-4 w-full text-gray-500 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AdminDashboard.propTypes = {
  parcels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      referenceCode: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      paymentStatus: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
};

export default AdminDashboard;