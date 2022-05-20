import React from 'react'
import './fanComponent.css';

export default function FanComponent({spin}) {
  return (
    <div>
      {spin ? 
      (<div className='fanComponent'>
        <div className="fan spin" >
            <div className="fan-top"></div>
            <div className="fan-right"></div>
            <div className="fan-bottom"></div>
            <div className="fan-left"></div>
        </div>
       </div>
      ) : 
      (
        <div className='fanComponent'>
        <div className="fan spin2" >
            <div className="fan-top"></div>
            <div className="fan-right"></div>
            <div className="fan-bottom"></div>
            <div className="fan-left"></div>
        </div>
       </div>
      )}
    </div>
  )
}
