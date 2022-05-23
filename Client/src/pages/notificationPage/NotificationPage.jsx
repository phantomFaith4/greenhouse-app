import React from 'react'
import './notificationPage.css';
import Sidebar from  '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import BigNotification from '../../components/bigNotificationComponent/BigNotification';
import {useState, useEffect } from 'react';
import axios from 'axios';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';


export default function NotificationPage() { 

  const [notifications,setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetch = async()=>{
      try{
        const res = await axios.get(`/api/notification/all`);
        setNotifications(res.data);
        setLoading(true);
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
      {
        loading ? 
        (
          <>
              <div className='notificationContainer'>
                  <div className='notificationsComponentsDiv'>
                    <ul className='notificationList'>
                    {
                      notifications.map(n =>(
                        <li className='notificationListItem'><BigNotification key={n._id} notification={n} /></li>
                        ))
                      }
                    </ul>
                  </div>
              </div>
          </>
        ) 
        : 
        (<LoadingComponent />)
      }
    </div>
  )
}
