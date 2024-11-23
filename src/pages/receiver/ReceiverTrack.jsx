import React, { useState } from 'react';
import Header from '../../Header';
import ReceiverSidebar from '../../components/ReceiverSidebar';
import { useParcels } from '../../context/ParcelContext';

function ReceiverTrack() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { parcels } = useParcels();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Filter parcels for the receiver
  const receiverParcels = parcels.filter(parcel => 
    parcel.name.toLowerCase().includes('receiver@example.com')
  );

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <ReceiverSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      
      <main className='main-container'>
        <div className='main-title'>
          <h3 className='font-bold'>TRACK PARCEL</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Track Your Parcel</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter reference number to track parcel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
            />
          </div>
          {searchTerm && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#FF8227]">
                    <th className="px-4 py-2 text-white">Reference</th>
                    <th className="px-4 py-2 text-white">Current Location</th>
                    <th className="px-4 py-2 text-white">Status</th>
                    <th className="px-4 py-2 text-white">Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {receiverParcels
                    .filter(parcel => 
                      parcel.referenceCode.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((parcel) => (
                      <tr key={parcel.id} className="border-b">
                        <td className="px-4 py-2">{parcel.referenceCode}</td>
                        <td className="px-4 py-2">{parcel.location}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            parcel.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {parcel.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{parcel.date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ReceiverTrack; 