import React from 'react'
import './notificationPage.css';
import Sidebar from  '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';


export default function NotificationPage() { 
  return (
    <div className='notificationPage'>
        <Sidebar/>
        <Topbar /> 
        <div className='notificationContainer'>
            <div className='notificationsComponentsDiv'>
               <p>sadasd</p>
               <p>sadasd</p><p>sadasd</p>
               <p>sadasd</p><p>sadasd</p><p>sadasd</p>
               <p>sadasd</p><p>sadasd</p>
            </div>
        </div>
    </div>
  )
}
