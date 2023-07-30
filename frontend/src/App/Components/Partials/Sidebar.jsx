import './Sidebar.css'
import React from 'react'
import { FaBars, FaTachometerAlt, FaUsers, FaCog, FaUserCircle } from 'react-icons/fa'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

const Sidebar = ({ active }) => {

  return (
    <div className='sidebar'>
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu">
          <FaBars />
        </div>
      </div>
      <div className="app-menu">
        <Link to={'/'} className={active === 'dashboard' ? "menu-item active" : "menu-item"}>
          <FaTachometerAlt className='left-icon' />
          <span>Dashboard</span>
        </Link>
        <Link to={'/employee'} className={active === 'employee' ? "menu-item active" : "menu-item"}>
          <FaUsers className='left-icon' />
          <span>Employes</span>
        </Link>
        <div className={active === 'settings' ? "menu-item active" : "menu-item"}>
          <FaCog className='left-icon' />
          <span>Settings</span>
        </div>
        <div className={active === 'profile' ? "menu-item active" : "menu-item"}>
          <FaUserCircle className='left-icon' />
          <span>Profile</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar