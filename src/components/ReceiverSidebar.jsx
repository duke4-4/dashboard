import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BsFillGrid3X3GapFill,
  BsListCheck,
  BsClockHistory,
  BsFillGearFill
} from 'react-icons/bs';
import Logo from "../assets/Logoo.png";

function ReceiverSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={Logo} alt="Logo" className="logo" style={{ width: "8rem" }} />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/receiver-dashboard">
            <BsFillGrid3X3GapFill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/receiver-dashboard/track">
            <BsListCheck className='icon'/> Track Parcel
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/receiver-dashboard/history">
            <BsClockHistory className='icon'/> History
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/receiver-dashboard/settings">
            <BsFillGearFill className='icon'/> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

ReceiverSidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default ReceiverSidebar; 