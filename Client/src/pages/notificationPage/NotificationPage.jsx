import React from 'react'
import './notificationPage.css';
import Sidebar from  '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import BigNotification from '../../components/bigNotificationComponent/BigNotification';

export default function NotificationPage() { 
  return (
    <div className='notificationPage'>
        <Sidebar/>
        <Topbar /> 
        <div className='notificationContainer'>
            <div className='notificationsComponentsDiv'>
              <BigNotification />
              <BigNotification />
              <BigNotification />
              <BigNotification />
              <BigNotification />
              <BigNotification />
            </div>
        </div>
    </div>
  )
}
