import React from 'react'
import './notificationComponent.css';
import Notification from '../notificationValueComponent/Notification';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function NotificationComponent() {
  
  const [notifications,setNotifications] = useState([]);
  
  useEffect(()=>{
    const fetchChampions = async () =>{ 
        const response = await axios.get('/api/notification/all');
        setNotifications(response.data);
    }; 
    fetchChampions();
  },[]);
  console.log("log=>",notifications);
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
