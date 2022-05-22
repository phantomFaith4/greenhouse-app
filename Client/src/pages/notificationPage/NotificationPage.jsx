import React from 'react'
import './notificationPage.css';
import Sidebar from  '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import BigNotification from '../../components/bigNotificationComponent/BigNotification';
import {useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationPage() { 

  const [notifications,setNotifications] = useState([]);

  useEffect(()=>{
    const fetch = async()=>{
      try{
        const res = await axios.get(`/api/notification/all`);
        setNotifications(res.data);
      }catch(err){
        console.log(err);
      }
    }; 
    fetch();
  },[])
  return (
    <div className='notificationPage'>
        <Sidebar/>
        <Topbar /> 
        <div className='notificationContainer'>
            <div className='notificationsComponentsDiv'>
              {
              notifications.map(n =>(
                <BigNotification key={n._id} notification={n} />
              ))
              }
            </div>
        </div>
    </div>
  )
}
