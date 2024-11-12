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
      {/* charts section */}
  {/* <div className="charts-container">
  <div className="charts-section bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Parcel Statistics</h3>
    <ParcelStats />
  </div>
  <div className="section parcel-tracking">
    <h3>Parcel Tracking</h3>
    <ParcelTrackingRadar />
  </div>
</div> */}
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



      {/* Send Parcel Modal */}
      {isSendModalOpen && (
        <div className='modal-overlay bg-gray-800 bg-opacity-60 fixed inset-0 flex items-center justify-center'>
  <div className='modal bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
    <h2 style={{color: '#FF8227' }} className="text-2xl font-bold mb-6 text-center">Send Parcel</h2>
    <form className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" value={generateReferenceCode()} readOnly placeholder="Reference Code" className="w-full p-2 border rounded"/>
        <input type="text" placeholder="Dispatch Address" className="w-full p-2 border rounded"/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Receiver Name" className="w-full p-2 border rounded"/>
        <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded"/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Destination Address" className="w-full p-2 border rounded"/>
        <input type="text" placeholder="Weight of Package (kg)" className="w-full p-2 border rounded"/>
      </div>
      <input type="text" placeholder="Description of Package" className="w-full p-2 border rounded"/>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Payment Amount" className="w-full p-2 border rounded"/>
        <select className="w-full p-2 border rounded">
          <option>Paid</option>
          <option>To pay on delivery</option>
          <option>Deliver + Float Paid</option>
          <option>Deliver + Float Pay Forward</option>
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
        <div className='modal-overlay'>
          <div className='modal'>
            <h2  style={{color: '#FF8227' }} >Receive Parcel</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Reference Code" />
              <input type="text" placeholder="Location" />
              <button type="submit">Receive</button>
            </form>
            <button onClick={closeAllModals} className="close-button">Close</button>
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
