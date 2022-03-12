import React from 'react'
import './userSettings.css';


export default function UserSettings() {
  return (
    <div className='userSettings'>
        <div className='profileImageDiv'>
        <img src={`https://preview.redd.it/tvnnil0xv7g61.jpg?width=1080&format=pjpg&auto=webp&s=817036d74401fcdd9dd61dd3db34fa8ebd0144a1`} alt='' className='profileImg' />
            <label for="profileImg">
              <div className='editImage'>
                <i className="editImageIcon fa-solid fa-pen"></i>
                <input type="file" id="profileImg" name="profileImg" accept="image/png, image/jpeg" />
              </div>  
            </label> 
        </div> 
        <form className='userInfoForm'>
            <input className='inputFirstnameSettings' type='text' placeholder='firstname' /> 
            <input className='inputLastnameSettings' type='text' placeholder='lastname' />
            <p></p>
            <input className='inputEmailSettings' type='text' placeholder='email' />
            <input className='inputPhoneSettings' type='text' placeholder='phone' />
            <p></p>
            <button className='submitButtonSettings' type='submit'>SAVE</button>
        </form>
    </div>
  )
}
