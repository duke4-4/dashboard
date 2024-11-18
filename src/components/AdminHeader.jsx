import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify
} from 'react-icons/bs';
import PropTypes from 'prop-types';

function AdminHeader({ OpenSidebar }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();

  // Refs for dropdown containers
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  // Sample data for dropdowns
  const notifications = [
    { id: 1, text: 'New parcel received', time: '5 min ago' },
    { id: 2, text: 'Delivery completed', time: '1 hour ago' },
    { id: 3, text: 'Payment confirmed', time: '2 hours ago' },
  ];

  const messages = [
    { id: 1, sender: 'John Doe', text: 'Package status update', time: '10 min ago' },
    { id: 2, sender: 'Jane Smith', text: 'Delivery query', time: '30 min ago' },
    { id: 3, sender: 'Mike Johnson', text: 'New request', time: '1 hour ago' },
  ];

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon_header' onClick={OpenSidebar} />
      </div>
      
      <div className='header-left'>
        <div className='search-container'>
          <BsSearch className='icon' />
          <input 
            type="text" 
            placeholder="Search..." 
            className='search-input'
            style={{ color: '#9e9ea4' }}
          />
        </div>
      </div>
      
      <div className='header-right'>
        {/* Notifications Dropdown */}
        <div className='relative' ref={notificationsRef}>
          <BsFillBellFill 
            className='icon_header cursor-pointer' 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfileDropdown(false);
            }}
          />
          {showNotifications && (
            <div className='absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50'>
              <h3 className='px-4 py-2 text-sm font-semibold text-[#db9600] border-b'>
                Notifications
              </h3>
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className='px-4 py-3 hover:bg-gray-50 border-b cursor-pointer'
                >
                  <p className='text-sm text-gray-700'>{notification.text}</p>
                  <p className='text-xs text-gray-500 mt-1'>{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className='relative' ref={messagesRef}>
          <BsFillEnvelopeFill 
            className='icon_header cursor-pointer' 
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfileDropdown(false);
            }}
          />
          {showMessages && (
            <div className='absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50'>
              <h3 className='px-4 py-2 text-sm font-semibold text-[#db9600] border-b'>
                Messages
              </h3>
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className='px-4 py-3 hover:bg-gray-50 border-b cursor-pointer'
                >
                  <p className='text-sm font-medium text-gray-700'>{message.sender}</p>
                  <p className='text-sm text-gray-600'>{message.text}</p>
                  <p className='text-xs text-gray-500 mt-1'>{message.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className='relative' ref={profileRef}>
          <BsPersonCircle 
            className='icon_header cursor-pointer' 
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
              setShowMessages(false);
            }}
          />
          
          {showProfileDropdown && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
              <button 
                className='block px-4 py-2 text-sm text-[#9e9ea4] hover:bg-[#db9600] hover:text-white w-full text-left'
                onClick={() => navigate('/admin-dashboard/profile')}
              >
                Profile
              </button>
              <button 
                className='block px-4 py-2 text-sm text-[#9e9ea4] hover:bg-[#db9600] hover:text-white w-full text-left'
                onClick={() => navigate('/admin-dashboard/settings')}
              >
                Settings
              </button>
              <button 
                className='block px-4 py-2 text-sm text-red-700 hover:bg-[#db9600] hover:text-white w-full text-left'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

AdminHeader.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default AdminHeader; 