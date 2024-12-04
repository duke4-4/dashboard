import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParcels } from '../../context/ParcelContext';
import {
  BsBoxSeam,
  BsTruck,
  BsCashStack,
  BsPeople,
  BsArrowUpRight,
  BsArrowDownRight,
  BsCalendar,
  BsBarChartLine,
  BsThreeDotsVertical
} from 'react-icons/bs';
import { Bar } from 'react-chartjs-2';
import DashboardLayout from '../../components/shared/DashboardLayout';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { format } from 'date-fns';

function AdminDashboard() {
  const { parcels } = useParcels();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalParcels: 0,
    inTransit: 0,
    delivered: 0,
    revenue: 0,
    customers: 0
  });

  useEffect(() => {
    calculateStats();
  }, [parcels]);

  const calculateStats = () => {
    const newStats = {
      totalParcels: parcels.length,
      inTransit: parcels.filter(p => p.status === 'In Transit').length,
      delivered: parcels.filter(p => p.status === 'Delivered').length,
      revenue: parcels.reduce((sum, p) => sum + (p.paymentStatus === 'Paid' ? p.amount : 0), 0),
      customers: new Set(parcels.map(p => p.senderEmail)).size
    };
    setStats(newStats);
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 20000, 25000, 28000],
      backgroundColor: '#FF8227'
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  const dashboardCards = [
    {
      title: 'Total Parcels',
      value: stats.totalParcels,
      icon: BsBoxSeam,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'In Transit',
      value: stats.inTransit,
      icon: BsTruck,
      color: 'yellow',
      change: '+5%'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue}`,
      icon: BsCashStack,
      color: 'green',
      change: '+18%'
    },
    {
      title: 'Customers',
      value: stats.customers,
      icon: BsPeople,
      color: 'purple',
      change: '+8%'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'parcel', message: 'New parcel registered', time: '5 min ago' },
    { id: 2, type: 'delivery', message: 'Parcel delivered', time: '10 min ago' },
    { id: 3, type: 'payment', message: 'Payment received', time: '15 min ago' }
  ];

  return (
    <DashboardLayout userType="admin" sidebar={AdminSidebar}>
      <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <BsCalendar />
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin/reports')}
            className="flex items-center gap-2 px-6 py-3 bg-[#FF8227] text-white rounded-xl hover:bg-[#db9600] transition-all shadow-lg hover:shadow-xl"
          >
            <BsBarChartLine className="text-xl" /> 
            <span>View Reports</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboardCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-b-4 border-[#FF8227]"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-opacity-20 bg-${card.color}-100`}>
                  <card.icon className={`text-2xl text-[#FF8227]`} />
                </div>
                <span className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <BsThreeDotsVertical />
                </span>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-sm">{card.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{card.value}</h3>
                <p className={`text-sm mt-2 flex items-center gap-1 ${
                  card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.change.startsWith('+') ? <BsArrowUpRight /> : <BsArrowDownRight />}
                  <span>{card.change}</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <select className="px-4 py-2 rounded-lg bg-gray-100 border-none text-gray-600 focus:ring-2 focus:ring-[#FF8227]">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <Bar data={revenueData} options={chartOptions} height={300} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-[#FF8227] hover:text-[#db9600] font-medium">View All</button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#FF8227] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Parcels Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Recent Parcels</h2>
              <button className="text-[#FF8227] hover:text-[#db9600] font-medium">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Reference', 'Customer', 'Status', 'Amount'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parcels.slice(0, 5).map((parcel) => (
                  <tr 
                    key={parcel.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {parcel.referenceCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {parcel.senderEmail}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        parcel.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : parcel.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        ${parcel.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard; 