import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify
} from 'react-icons/bs';
import PropTypes from 'prop-types';

function Header({ OpenSidebar }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Search suggestions data
  const searchSuggestions = [
    { term: 'Send Parcel', path: '/dashboard', action: 'send' },
    { term: 'Receive Parcel', path: '/dashboard', action: 'receive' },
    { term: 'Track Parcel', path: '/dashboard', action: 'track' },
    { term: 'History', path: '/dashboard', action: 'history' },
    { term: 'Settings', path: '/dashboard/settings' },
    { term: 'Profile', path: '/dashboard/profile' },
  ];

  // Refs for dropdowns
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);
  const searchRef = useRef(null);

  // Filter suggestions based on search term
  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSelect = (suggestion) => {
    setSearchTerm('');
    setShowSuggestions(false);
    
    if (suggestion.action) {
      // Handle special actions that need to trigger modals
      // You'll need to pass these functions as props from the parent component
      switch (suggestion.action) {
        case 'send':
          // Handle send modal
          break;
        case 'receive':
          // Handle receive modal
          break;
        case 'track':
          // Handle tracking
          break;
        case 'history':
          // Handle history modal
          break;
        default:
          break;
      }
    }
    
    navigate(suggestion.path);
  };

  // Click outside handlers
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
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
      
      <div className='header-left' ref={searchRef}>
        <div className='search-wrapper'>
          <BsSearch className='icon' />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className='search-input'
          />
          {showSuggestions && searchTerm && (
            <div className='search-suggestions'>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className='suggestion-item'
                  onClick={() => handleSearchSelect(suggestion)}
                >
                  <BsSearch className='suggestion-icon' />
                  <span>{suggestion.term}</span>
                </div>
              ))}
              {filteredSuggestions.length === 0 && (
                <div className='suggestion-item no-results'>
                  No results found
                </div>
              )}
            </div>
          )}
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
              {showNotifications.map(notification => (
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
              {showMessages.map(message => (
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
                onClick={() => navigate('/dashboard/profile')}
              >
                Profile
              </button>
              <button 
                className='block px-4 py-2 text-sm text-[#9e9ea4] hover:bg-[#db9600] hover:text-white w-full text-left'
                onClick={() => navigate('/dashboard/settings')}
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

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
