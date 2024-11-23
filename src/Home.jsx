import { useState } from 'react';
import './Dashboard.css';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsClockHistory,
  BsFillBellFill
} from 'react-icons/bs';
import { useParcels } from './context/ParcelContext';

function Home() {
  const [isSendModalOpen, setSendModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false);
  const [isNotificationsModalOpen, setNotificationsModalOpen] = useState(false);

  const closeAllModals = () => {
    setSendModalOpen(false);
    setHistoryModalOpen(false);
    setTrackingModalOpen(false);
    setNotificationsModalOpen(false);
  };

  const { parcels, addParcel } = useParcels();

  const handleSendParcel = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newParcel = {
      referenceCode: generateReferenceCode(),
      name: formData.get('receiverName'),
      location: formData.get('destinationAddress'),
      amount: parseFloat(formData.get('paymentAmount')),
      paymentStatus: formData.get('paymentStatus'),
      description: formData.get('description'),
      weight: formData.get('weight'),
      dispatchAddress: formData.get('dispatchAddress'),
      phoneNumber: formData.get('phoneNumber'),
    };
    
    addParcel(newParcel);
    closeAllModals();
  };

  const generateReferenceCode = () => `REF${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <main className={`main-container ${isSendModalOpen || isHistoryModalOpen || isTrackingModalOpen || isNotificationsModalOpen ? 'blurred' : ''}`}>
      <div className='main-title'>
        <h3 className='font-bold'>SENDER DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card' onClick={() => setSendModalOpen(true)}>
          <div className='card-inner'>
            <h3>SEND PARCEL</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setTrackingModalOpen(true)}>
          <div className='card-inner'>
            <h3>TRACK PARCEL</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setHistoryModalOpen(true)}>
          <div className='card-inner'>
            <h3>HISTORY</h3>
            <BsClockHistory className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setNotificationsModalOpen(true)}>
          <div className='card-inner'>
            <h3>NOTIFICATIONS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Parcel Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-green-600 font-semibold">Sent</h4>
              <p className="text-2xl font-bold text-green-700">20</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-yellow-600 font-semibold">Pending</h4>
              <p className="text-2xl font-bold text-yellow-700">15</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-600 font-semibold">Delivered</h4>
              <p className="text-2xl font-bold text-blue-700">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Parcel Tracking Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-purple-600 font-semibold">In Transit</h4>
              <p className="text-2xl font-bold text-purple-700">30</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-orange-600 font-semibold">Out for Delivery</h4>
              <p className="text-2xl font-bold text-orange-700">10</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h4 className="text-cyan-600 font-semibold">Dispatched</h4>
              <p className="text-2xl font-bold text-cyan-700">15</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="text-emerald-600 font-semibold">Delivered</h4>
              <p className="text-2xl font-bold text-emerald-700">20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions and Events Section */}
      <div className='toasts mt-6'>
        <div className="section promotions-tips bg-[#FF8227] p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Promotions & Quick Tips</h3>
          <p className="text-white mb-2">Get 10% off your next parcel with code <span className="font-bold text-black">SAVE10</span></p>
          <p className="text-white">Tip: Double-check address for faster deliveries.</p>
        </div>
        <div className="section upcoming-events bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
          <ul>
            <li className="mb-2 text-[#FF8227]">Event: Parcel Delivery Workshop - Date: 15th Nov</li>
            <li className="mb-2 text-[#FF8227]">Event: Customer Feedback Session - Date: 22nd Nov</li>
          </ul>
        </div>
      </div>

      {/* Send Parcel Modal */}
      {isSendModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 style={{color: '#FF8227'}} className="text-2xl font-bold mb-6">Send Parcel</h2>
            <form onSubmit={handleSendParcel} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="referenceCode" value={generateReferenceCode()} readOnly placeholder="Reference Code" className="w-full p-2 border rounded"/>
                <input type="text" name="dispatchAddress" placeholder="Dispatch Address" className="w-full p-2 border rounded"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="receiverName" placeholder="Receiver Name" className="w-full p-2 border rounded"/>
                <input type="text" name="phoneNumber" placeholder="Phone Number" className="w-full p-2 border rounded"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="destinationAddress" placeholder="Destination Address" className="w-full p-2 border rounded"/>
                <input type="text" name="weight" placeholder="Weight of Package (kg)" className="w-full p-2 border rounded"/>
              </div>
              <input type="text" name="description" placeholder="Description of Package" className="w-full p-2 border rounded"/>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="paymentAmount" placeholder="Payment Amount" className="w-full p-2 border rounded"/>
                <select name="paymentStatus" className="w-full p-2 border rounded">
                  <option value="Paid">Paid</option>
                  <option value="To Pay">To pay on delivery</option>
                  <option value="Float Paid">Deliver + Float Paid</option>
                  <option value="Float Forward">Deliver + Float Pay Forward</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Send</button>
            </form>
            <button onClick={closeAllModals} className="mt-4 w-full text-gray-500 hover:underline">Close</button>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 style={{color: '#FF8227'}}>Sent Parcels History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#FF8227]">
                    <th className="px-4 py-2 text-white">Reference</th>
                    <th className="px-4 py-2 text-white">Receiver</th>
                    <th className="px-4 py-2 text-white">Date</th>
                    <th className="px-4 py-2 text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id} className="border-b">
                      <td className="px-4 py-2">{parcel.referenceCode}</td>
                      <td className="px-4 py-2">{parcel.name}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={closeAllModals} className="mt-4 w-full text-gray-500 hover:underline">Close</button>
          </div>
        </div>
      )}

      {/* Track Parcel Modal */}
      {isTrackingModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 style={{color: '#FF8227'}}>Track Parcel</h2>
            <input
              type="text"
              placeholder="Enter reference number..."
              className="w-full p-2 border rounded mb-4"
            />
            <button onClick={closeAllModals} className="mt-4 w-full text-gray-500 hover:underline">Close</button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {isNotificationsModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2 style={{color: '#FF8227'}}>Notifications</h2>
            <ul className="space-y-2">
              <li className="p-2 bg-gray-50 rounded">Parcel REF123456 has been delivered</li>
              <li className="p-2 bg-gray-50 rounded">New promotion available: Use code SAVE10</li>
            </ul>
            <button onClick={closeAllModals} className="mt-4 w-full text-gray-500 hover:underline">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
