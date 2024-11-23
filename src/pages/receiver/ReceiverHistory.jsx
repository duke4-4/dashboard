import React from 'react';
import Header from '../../Header';
import ReceiverSidebar from '../../components/ReceiverSidebar';
import { useParcels } from '../../context/ParcelContext';
import { useState } from 'react';

function ReceiverHistory() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
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
          <h3 className='font-bold'>PARCEL HISTORY</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#FF8227]">
                  <th className="px-4 py-2 text-white">Reference</th>
                  <th className="px-4 py-2 text-white">Date</th>
                  <th className="px-4 py-2 text-white">Status</th>
                  <th className="px-4 py-2 text-white">Payment Status</th>
                  <th className="px-4 py-2 text-white">Amount</th>
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
                    <td className="px-4 py-2">${parcel.amount}</td>
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

export default ReceiverHistory; 