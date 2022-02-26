import React from 'react'
import './userSettings.css';


export default function UserSettings() {
  return (
    <div className='userSettings'>
        <img src='https://cdn5.vectorstock.com/i/thumb-large/17/59/default-placeholder-businessman-half-length-portr-vector-21181759.jpg' alt='' className='profileImg' />
        <form className='userInfoForm'>
            <input type='text' placeholder='firstname' /> 
            <input type='text' placeholder='lastname' />
            <input type='text' placeholder='email' />
            <input type='text' placeholder='phone' />
            <button type='submit'>SAVE</button>
        </form>
    </div>
  )
}
