import React from 'react'
import './notificationComponent.css';
import Notification from '../notificationValueComponent/Notification';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function NotificationComponent({loc}) {

  const [notifications,setNotifications] = useState([]);
  useEffect(()=>{
    const fetchNotifications = async () =>{ 
        const response = await axios.get(`/api/notification/${loc}`);
        setNotifications(response.data);
    }; 
    fetchNotifications();
  },[loc,notifications]);

  return (
    <div className='notificationComponent'>
        <span className='widgetTitle'>NOTIFICATIONS</span>
        <ul className='notificationList'>
        { 
          notifications.map(n =>   
            (    
             <li className='notificationListItem'><Notification key={n._id} notification={n}/></li>
            )
          )
        }
        </ul>  
    </div>
  )
}
