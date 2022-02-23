import React from 'react';
import './sidebar.css';

export default function Sidebar() {
  return (
        <div className='sidebar'>
            <div className='userPartSidebar'>
                <i className="sidebarIcon fas fa-seedling"></i>
                <i className="sidebarIcon fas fa-user"></i>
                <i className="sidebarIcon fas fa-home"></i>
                <i className="sidebarIcon fas fa-bell"></i>
            </div>
            <div className='greenhousePartSidebar'>
                <i className="sidebarIcon fas fa-tint"></i>
                <i className="sidebarIcon fas fa-faucet"></i>
                <i className="sidebarIcon fas fa-thermometer-half"></i>
                <i className="sidebarIcon fas fa-lightbulb"></i>
            </div> 
            <div className='logoutPartSidebar'>
                <i className="sidebarIcon fas fa-sign-out-alt"></i>
            </div>
        </div>
    );
}
