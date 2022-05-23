import React from 'react'
import './loadingComponent.css';


export default function LoadingComponent() {
  return (
    <div className='loadingComponent'>
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}
