import React from 'react'
import './notification.css';

export default function Notification() {
  return (
    <div className='notification'>
       <p className='notificationText'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Placeat, atque dolor?
        </p>
        <span className='location'>Greenhouse 13</span>
        <span className='time'>13.13.1313</span>
    </div>
  )
}
