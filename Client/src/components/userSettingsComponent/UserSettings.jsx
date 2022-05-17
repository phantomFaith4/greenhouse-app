import React from 'react'
import './userSettings.css';
import {useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function UserSettings() {
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
  useEffect(()=>{
    try{
        setUser(JSON.parse(localStorage.getItem('user')));
    }catch(err){

    };
  },[]); 
  
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
        <div className='userInfoDiv'>
          <div className='userPart1'>
            <span className='userNameSpan'>ERNAD</span>
            <span className='userLastnameSpan'>KARAHASANOVIC</span>
          </div>
          <div className='userPart2'>
            <span className='emailSpan'>ernad.karahasanovic@gmail.com</span>
            <span className='phoneSpan'>061-449-540</span>
          </div>
        </div>
        <div className='editProfileParentDiv'>
          <div onClick={handleClickOpen} className='editProfileDiv'>
            <i className="editProfileIcon fa-solid fa-user-pen"></i>
          </div> 
          <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add User info</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Fill information about User you want add or edit
                    </DialogContentText>
                        <TextField  autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" />
                        <TextField  autoFocus margin="dense" id="lastname" label="Lastname" type="text" fullWidth variant="standard" />
                        <TextField  autoFocus margin="dense" id="email" label="Email address" type="email" fullWidth variant="standard" />
                        <TextField  autoFocus margin="dense" id="phone" label="Phone number" type="phone" fullWidth variant="standard" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Edit</Button>
                    </DialogActions>
            </Dialog>
        </div>
    </div>
  )
}
