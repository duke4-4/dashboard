import React, { useState } from 'react';
import './Dashboard.css';
// import ParcelStats from './ParcelsStats';
import { Bar } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import { RadialLinearScale } from 'chart.js';
import { LineElement } from 'chart.js';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';
import {
  Chart as ChartJS,
  CategoryScale,
  
  LinearScale,
  BarElement,
  PointElement,  // Add this import
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useParcels } from './context/ParcelContext';

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
    LineElement,
  LinearScale,
  BarElement,
  PointElement,  // Register point element
  Title,
  Tooltip,
  Legend
);

function ParcelTrackingRadar() {
  const data = {
    labels: ['Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'],
    datasets: [
      {
        label: 'Parcel Tracking',
        data: [15, 30, 10, 20], // Example data
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: '#22CAEC',
      },
    ],
  };

  return <Radar data={data} />;
}
function ParcelStats() {
  const data = {
    labels: ['Sent', 'Received', 'Pending'],
    datasets: [
      {
        label: 'Parcel Stats',
        data: [20, 15, 5],
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      },
    ],
  };

  return <Bar data={data} />;
}

function Home() {
  const [isSendModalOpen, setSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [isReceiversModalOpen, setReceiversModalOpen] = useState(false);

  const closeAllModals = () => {
    setSendModalOpen(false);
    setReceiveModalOpen(false);
    setHistoryModalOpen(false);
    setReceiversModalOpen(false);
  };
const [searchTerm, setSearchTerm] = useState('');
const { parcels, addParcel, updateParcel } = useParcels();

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

const handleReceiveParcel = (id, paymentStatus) => {
  updateParcel(id, {
    status: 'Received',
    paymentStatus,
    receivedDate: new Date().toISOString().split('T')[0]
  });
};

  const generateReferenceCode = () => `REF${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <main className={`main-container ${isSendModalOpen || isReceiveModalOpen || isHistoryModalOpen || isReceiversModalOpen ? 'blurred' : ''}`}>
      <div className='main-title'>
        <h3 className='font-bold'>HOME</h3>
      </div>

      <div className='main-cards'>
        <div className='card' onClick={() => setSendModalOpen(true)}>
          <div className='card-inner'>
            <h3>SEND PARCEL</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setReceiveModalOpen(true)}>
          <div className='card-inner'>
            <h3>RECEIVE PARCEL</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setHistoryModalOpen(true)}>
          <div className='card-inner'>
            <h3>HISTORY</h3>
            <BsPeopleFill className='card_icon' />
          </div>
        </div>
        <div className='card' onClick={() => setReceiversModalOpen(true)}>
          <div className='card-inner'>
            <h3>RECENT RECEIVERS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
        </div>
      </div>
 
  <div className="charts-container">
  <div className="charts-section bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Parcel Statistics</h3>
    <ParcelStats />
  </div>
  <div className="section parcel-tracking">
    <h3>Parcel Tracking</h3>
    <ParcelTrackingRadar />
  </div>
</div>

<div className='toasts'>
  <div className="section promotions-tips bg-[#FF8227] p-6 rounded-lg shadow-md mb-6">
  <h3 className="text-2xl font-semibold text-white mb-4">Promotions & Quick Tips</h3>
  <p className="text-white mb-2">Get 10% off your next parcel with code <span className="font-bold text-black">SAVE10</span></p>
  <p className="text-white">Tip: Double-check address for faster deliveries.</p>
</div>
<div className="section upcoming-events bg-white p-6 rounded-lg shadow-md mb-6">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
  <ul>
    <li className="mb-2 text-[#FF8227] ">Event: Parcel Delivery Workshop - Date: 15th Nov</li>
    <li className="mb-2 text-[#FF8227]">Event: Customer Feedback Session - Date: 22nd Nov</li>
  </ul>
</div>


{/* <div className="section call-to-action bg-white p-6 rounded-lg shadow-md mb-6">
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Earn Points</h3>
  <p className=' text-[#FF8227]' >Share your experiences and tips with friends and family, and earn points for each. Redeem your points for free parcels.</p>
  <button onClick={closeAllModals} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Earn Points</button>
</div> */}
</div>





      {/* Send Parcel Modal*/}
      {isSendModalOpen && (
        <div className='modal-overlay bg-gray-800 bg-opacity-60 fixed inset-0 flex items-center justify-center'>
  <div className='modal bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
    <h2 style={{color: '#FF8227' }} className="text-2xl font-bold mb-6 text-center">Send Parcel</h2>
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

      {/* Receive Parcel Modal */}
    {isReceiveModalOpen && (
  <div className='modal-overlay bg-gray-800 bg-opacity-60 fixed inset-0 flex items-center justify-center'>
    <div className='modal bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
      <h2 style={{ color: '#FF8227' }} className="text-2xl font-bold mb-6 text-center">Receive Parcel</h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by reference number..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8227]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtered Parcel List */}
      <div className="max-h-[400px] overflow-y-auto">
        {parcels
          .filter((parcel) =>
            parcel.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
            parcel.status !== 'Received'
          )
          
          .map((parcel) => (
            <div key={parcel.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-800">Reference: {parcel.referenceCode}</p>
                  <p className="text-gray-600">Name: {parcel.name}</p>
                  <p className="text-gray-600">Location: {parcel.location}</p>
                  <p className="text-gray-600">Amount: ${parcel.amount}</p>
                  {parcel.float > 0 && (
                    <p className="text-gray-600">Float: ${parcel.float}</p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  parcel.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {parcel.status}
                </span>
              </div>

              {/* Payment Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  onClick={() => handleReceiveParcel(parcel.id, 'Paid')}
                >
                  Mark as Paid
                </button>
                {parcel.float > 0 && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handleReceiveParcel(parcel.id, 'Paid with Float')}
                  >
                    Use Float (${parcel.float})
                  </button>
                )}
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                  onClick={() => handleReceiveParcel(parcel.id, 'Pending Payment')}
                >
                  Receive Only
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleReceiveParcel(parcel.id, 'Payment Declined')}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}

        {parcels.filter(parcel => 
          parcel.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
          parcel.status !== 'Received'
        ).length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No pending parcels found with this reference number.
          </div>
        )}
      </div>

      {/* Close Modal */}
      <button
        onClick={closeAllModals}
        className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2  style={{color: '#FF8227' }} >History</h2>
            <ul className='history-list'>
              <li>
                <span>Parcel 1</span>
                <span>REF123456</span>
                <span>12/10/2024</span>
              </li>
              {/* Add more history items as needed */}
            </ul>
            <button onClick={closeAllModals} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Recent Receivers Modal */}
      {isReceiversModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2  style={{color: '#FF8227' }} >Recent Receivers</h2>
            <ul className='recent-receivers-list'>
              <li className='receiver-item'>
                <span>John Doe</span>
                <button className='send-again-button'>Send Again</button>
              </li>
              {/* Add more receivers as needed */}
            </ul>
            <button onClick={closeAllModals} className="close-button">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
