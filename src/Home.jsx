import React, { useState } from 'react';
import './Dashboard.css';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';

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
        <h3>DASHBOARD</h3>
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
