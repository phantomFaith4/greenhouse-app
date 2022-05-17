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
  },[loc]);

  return (
    <div className='notificationComponent'>
        <span className='widgetTitle'>NOTIFICATIONS</span>
        { 
          notifications.map(n =>  
          ( 
          <Notification key={n.id} notification={n}/>
          ))} 
    </div>
  )
}
