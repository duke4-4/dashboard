import React from 'react'
import './Dashboard.css'
import Logo from './assets/log.png'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
          <img className='w-20' src={Logo} alt="" />
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
              </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Receivers
                </a>
            </li>
            
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> History
                </a>
            </li>
            
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar