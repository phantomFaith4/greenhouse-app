import React, { useEffect } from 'react'
import './notification.css';

export default function Notification({notification}) {
  return (
    <div className='notification'>
       <p className='notificationText'>
         {notification.value}
        </p>
        <span className='location'>{notification.location}</span>
        <span className='time'>{new Date(notification.createdAt).toDateString()}</span>
    </div>
  ) 
}
