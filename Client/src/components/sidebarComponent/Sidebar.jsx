import React from 'react';
import './sidebar.css';
import {Link } from 'react-router-dom';

export default function Sidebar() {
  return (
        <div className='sidebar'>
            <div className='userPartSidebar'>
                <i className="sidebarIcon fas fa-seedling"></i>
                <Link to='/account'><i className="sidebarIcon fas fa-user"></i></Link>
                <Link to='/home'><i className="sidebarIcon fas fa-home"></i></Link>
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
