import React from 'react';
import './sidebar.css';
import {Link } from 'react-router-dom';

export default function Sidebar() {
    const handleLogout = ()=>{
        localStorage.clear();
        window.location.replace(`/login`);
    }
  return (
        <div className='sidebar'> 
            <div className='userPartSidebar'>
                <i className="sidebarIcon fas fa-seedling"></i>
                <Link to='/home'><i className="sidebarIcon fas fa-home"></i></Link>
                <Link to='/account'><i className="sidebarIcon fas fa-user"></i></Link>
                <Link to='/notifications'><i className="sidebarIcon fas fa-bell"></i></Link>
            </div>
            <div className='greenhousePartSidebar'>
                <Link to='/water'><i className="sidebarIcon fas fa-faucet"></i></Link>
                <Link to='/temperature'><i className="sidebarIcon fas fa-thermometer-half"></i></Link>
                <Link to='/light'><i className="sidebarIcon fas fa-lightbulb"></i></Link>
                <Link to='/co2'><i className="sidebarIcon fa-solid fa-gauge-high"></i></Link>
                <Link to='/humidity'><i className="sidebarIcon fas fa-tint"></i> </Link>
            </div> 
            <div className='logoutPartSidebar'>
                <i onClick={handleLogout} className="sidebarIcon fas fa-sign-out-alt"></i>
            </div>
        </div>
    );
}
