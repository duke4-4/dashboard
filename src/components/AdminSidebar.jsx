import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill
} from 'react-icons/bs';
import Logo from "../assets/Logoo.png";

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
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
          <Link to="/admin-dashboard">
            <BsFillArchiveFill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard/parcels">
            <BsFillGrid3X3GapFill className='icon'/> Parcels
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard/customers">
            <BsPeopleFill className='icon'/> Customers
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard/tracking">
            <BsListCheck className='icon'/> Tracking
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard/reports">
            <BsMenuButtonWideFill className='icon'/> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin-dashboard/settings">
            <BsFillGearFill className='icon'/> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

AdminSidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired,
};

export default AdminSidebar; 