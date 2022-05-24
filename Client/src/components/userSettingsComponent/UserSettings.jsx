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
import { Buffer } from 'buffer';

export default function UserSettings() {
  
  window.Buffer = Buffer;

  const [open, setOpen] = useState(false);
  const [user,setUser] = useState([]);
  const [name,setName] = useState();
  const [lastname,setLastname] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [file, setFile] = useState(null);

  const [mimeType_d,setMimeType] = useState('');
  const [b64_d,setB64] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
  const updateUser = async ()=>{
    try{
      const update = await axios.put(`/api/user/${user._id}`,{
        name:name,
        lastname:lastname,
        email:email,
        phone:phone,
      });
      setOpen(false);
    }catch(err){

    };
  }
  const handleSubmit = async (e) => {

    e.preventDefault();
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try { 
        await axios.post(`/api/uploadPhoto/${user._id}`, data);
        console.log("Image uploaded");
        setFile(null);
      } catch (err) {};
      
  };
  
  useEffect(()=>{
      const fetch = async()=>{
        try{
         const user = await JSON.parse(localStorage.getItem('user'));
         try{
           const res = await axios.get(`/api/user/${user._id}`);
            setUser(res.data);
            const buffer = res.data.image.data.data; 
            const b64 = new Buffer.from(buffer).toString('base64');
            const mimeType = "image/png";
            setMimeType(mimeType);
            setB64(b64);
          }catch(err){

         }; 
        }catch(err){};
      };
      fetch();
  },[user]); 

  return (
    <div className='userSettings'>
        <div className='profileImageDiv'>
        <img src={`data:${mimeType_d};base64,${b64_d}`} alt='' className='profileImg' />
            <form onSubmit={handleSubmit}>
            <label for="profileImg">
                <div className='editImage'>
                  <i className="editImageIcon fa-solid fa-pen"></i>
                  <input onChange={(e) => setFile(e.target.files[0])} type="file" id="profileImg" name="profileImg" accept="image/png, image/jpeg" />
                </div>  
            </label>
            {
              file ? 
              (
                <button className="writeSubmit" type="submit">
                Save
              </button>
              )
              :
              (
                ''
              )
            }     
            </form>
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
