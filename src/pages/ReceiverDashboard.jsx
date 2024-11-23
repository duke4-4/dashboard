import { useState, useEffect } from 'react';
import Header from '../Header';
import ReceiverSidebar from '../components/ReceiverSidebar';
import { useApi } from '../context/ApiContext';

function ReceiverDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [receiverParcels, setReceiverParcels] = useState([]);
  const [parcelStats, setParcelStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0
  });

  const api = useApi();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch parcels for receiver
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const allParcels = await api.getAllParcels();
        const filteredParcels = allParcels.filter(parcel => 
          parcel.name.toLowerCase().includes('receiver@example.com')
        );
        setReceiverParcels(filteredParcels);

        // Calculate stats
        setParcelStats({
          total: filteredParcels.length,
          pending: filteredParcels.filter(p => p.status === 'Pending').length,
          delivered: filteredParcels.filter(p => p.status === 'Received').length
        });
      } catch (error) {
        console.error('Error fetching parcels:', error);
      }
    };

    fetchParcels();
  }, [api]);

  // Handle parcel search
  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const searchResults = await api.searchParcels(searchTerm);
      // Filter for receiver's parcels only
      const filteredResults = searchResults.filter(parcel => 
        parcel.name.toLowerCase().includes('receiver@example.com')
      );
      setReceiverParcels(filteredResults);
    } catch (error) {
      console.error('Error searching parcels:', error);
    }
  };

  // Track specific parcel
  const handleTrackParcel = async (referenceCode) => {
    try {
      const parcel = await api.trackParcel(referenceCode);
      if (parcel && parcel.name.toLowerCase().includes('receiver@example.com')) {
        // Update the parcels list with the tracked parcel
        setReceiverParcels(prevParcels => {
          const updatedParcels = prevParcels.map(p => 
            p.referenceCode === referenceCode ? parcel : p
          );
          return updatedParcels;
        });
      }
    } catch (error) {
      console.error('Error tracking parcel:', error);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <ReceiverSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      
      <main className='main-container'>
        <div className='main-title'>
          <h3 className='font-bold'>RECEIVER DASHBOARD</h3>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Search Parcels</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter reference number or sender details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[#FF8227] text-white rounded-lg hover:bg-[#db9600]"
            >
              Search
            </button>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#FF8227]">
                    <th className="px-4 py-2 text-white">Reference</th>
                    <th className="px-4 py-2 text-white">Sender</th>
                    <th className="px-4 py-2 text-white">Status</th>
                    <th className="px-4 py-2 text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receiverParcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b">
                      <td className="px-4 py-2">{parcel.referenceCode}</td>
                      <td className="px-4 py-2">{parcel.dispatchAddress}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          parcel.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {parcel.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleTrackParcel(parcel.referenceCode)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="main-cards">
          <div className="card">
            <div className='card-inner'>
              <h3>TOTAL PARCELS</h3>
              <p className="text-2xl font-bold">{parcelStats.total}</p>
            </div>
          </div>
          <div className="card">
            <div className='card-inner'>
              <h3>PENDING PARCELS</h3>
              <p className="text-2xl font-bold">{parcelStats.pending}</p>
            </div>
          </div>
          <div className="card">
            <div className='card-inner'>
              <h3>DELIVERED PARCELS</h3>
              <p className="text-2xl font-bold">{parcelStats.delivered}</p>
            </div>
          </div>
        </div>

        {/* Parcel History */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Parcel History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#FF8227]">
                  <th className="px-4 py-2 text-white">Reference</th>
                  <th className="px-4 py-2 text-white">Date</th>
                  <th className="px-4 py-2 text-white">Status</th>
                  <th className="px-4 py-2 text-white">Payment Status</th>
                  <th className="px-4 py-2 text-white">Sender</th>
                </tr>
              </thead>
              <tbody>
                {receiverParcels.map((parcel) => (
                  <tr key={parcel.id} className="border-b">
                    <td className="px-4 py-2">{parcel.referenceCode}</td>
                    <td className="px-4 py-2">{parcel.date}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        parcel.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{parcel.paymentStatus}</td>
                    <td className="px-4 py-2">{parcel.dispatchAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReceiverDashboard; 