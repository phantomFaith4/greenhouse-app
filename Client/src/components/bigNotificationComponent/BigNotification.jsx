import React from 'react'
import './bigNotification.css';

export default function BigNotification({notification}) {
  return (
    <div className='bigNotification'>
       <p className='bigNotificationText'>
        {notification ? notification.value : 'NaN'}
        </p> 
        <span className='bigLocation'>{notification ? notification.location : 'NaN'}</span>
        <span className='bigTime'>{notification ? notification.createdAt : 'NaN'}</span>
    </div>
  )
}
