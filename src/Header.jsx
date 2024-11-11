import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [searchVisible, setSearchVisible] = useState(false); // State to toggle search input visibility
  const [dropdownVisible, setDropdownVisible] = useState({
    bell: false,
    envelope: false,
    person: false,
  }); // State to handle dropdown visibility for each icon

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleDropdown = (icon) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [icon]: !prevState[icon],
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = ['bell', 'envelope', 'person'];
      dropdowns.forEach((icon) => {
        const dropdownElement = document.getElementById(icon);
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setDropdownVisible((prevState) => ({
            ...prevState,
            [icon]: false,
          }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='header flex justify-between items-center p-4'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        {searchVisible ? (
          <input
            type="text"
            placeholder="Search..."
            className="search-input border rounded px-2 py-1"
          />
        ) : (
          <BsSearch className='icon cursor-pointer' onClick={toggleSearch} />
        )}
      </div>
      <div className='header-right flex space-x-4'>
        {/* Bell Icon with Dropdown */}
        <div className='relative' id="bell">
          <BsFillBellFill
            className='icon cursor-pointer'
            onClick={() => toggleDropdown('bell')}
          />
          {dropdownVisible.bell && (
            <div className="dropdown absolute top-8 right-0 w-48 bg-white border rounded shadow-lg">
              <ul className="text-sm">
                <li className="p-2 hover:bg-gray-200">Notification 1</li>
                <li className="p-2 hover:bg-gray-200">Notification 2</li>
                <li className="p-2 hover:bg-gray-200">Notification 3</li>
              </ul>
            </div>
          )}
        </div>

        {/* Envelope Icon with Dropdown */}
        <div className='relative' id="envelope">
          <BsFillEnvelopeFill
            className='icon cursor-pointer'
            onClick={() => toggleDropdown('envelope')}
          />
          {dropdownVisible.envelope && (
            <div className="dropdown absolute top-8 right-0 w-48 bg-white border rounded shadow-lg">
              <ul className="text-sm">
                <li className="p-2 hover:bg-gray-200">Message 1</li>
                <li className="p-2 hover:bg-gray-200">Message 2</li>
                <li className="p-2 hover:bg-gray-200">Message 3</li>
              </ul>
            </div>
          )}
        </div>

        {/* Person Icon with Dropdown */}
        <div className='relative' id="person">
          <BsPersonCircle
            className='icon cursor-pointer'
            onClick={() => toggleDropdown('person')}
          />
          {dropdownVisible.person && (
            <div className="dropdown absolute top-8 right-0 w-48 bg-white border rounded shadow-lg">
              <ul className="text-sm">
                <li className="p-2 hover:bg-gray-200">Profile</li>
                <li className="p-2 hover:bg-gray-200">Settings</li>
                <li className="p-2 hover:bg-gray-200">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
