import React from 'react'
import './userSettings.css';
import {useState, useEffect } from 'react';
import axios from 'axios';
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

  const [name,setName] = useState();
  const [lastname,setLastname] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
  const updateUser = async ()=>{
    try{
      const update = await axios.put(`/api/user/:id`,{
        name:name,
        lastname:lastname,
        email:email,
        phone:phone,
      });
      setOpen(false);
    }catch(err){

    };
  }
  useEffect(()=>{
      const fetch = async()=>{
        try{
         const user = await JSON.parse(localStorage.getItem('user'));
         try{
           const res = await axios.get(`/api/user/${user._id}`);
           setUser(res.data);
         }catch(err){

         };
        }catch(err){

        }
      };
      fetch();
  },[updateUser]); 

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
            <span className='userNameSpan'>{user.name}</span>
            <span className='userLastnameSpan'>{user.lastname}</span>
          </div>
          <div className='userPart2'>
            <span className='emailSpan'>{user.email}</span>
            <span className='phoneSpan'>{user.phone}</span>
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
                        <TextField  defaultValue={user.name} onChange={(e)=>setName(e.target.value)} autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" />
                        <TextField  defaultValue={user.lastname} onChange={(e)=>setLastname(e.target.value)} autoFocus margin="dense" id="lastname" label="Lastname" type="text" fullWidth variant="standard" />
                        <TextField  defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)} autoFocus margin="dense" id="email" label="Email address" type="email" fullWidth variant="standard" />
                        <TextField  defaultValue={user.phone} onChange={(e)=>setPhone(e.target.value)} autoFocus margin="dense" id="phone" label="Phone number" type="phone" fullWidth variant="standard" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateUser}>Edit</Button>
                    </DialogActions>
            </Dialog>
        </div>
    </div>
  )
}
