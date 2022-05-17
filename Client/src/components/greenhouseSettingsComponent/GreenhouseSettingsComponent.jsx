import React from 'react'
import './greenhouseSettingsComponent.css';
import {useState, useEffect } from 'react';
import axios from 'axios';
import LoadingComponent from '../loadingComponent/LoadingComponent';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function GreenhouseSettingsComponent() {
    const [greenhouse, setGreenhouse] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteGreenhouse = async (id)=>{
        try{
            const del = await axios.delete(`/api/greenhouse/${id}`);
            setOpen(false);
        }catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const res = await axios.get(`/api/greenhouse/all`);
                setGreenhouse(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch(); 
    },[deleteGreenhouse]);

  return ( 
    <div className='greenhouseSettings'>
        <LoadingComponent />
        <div className="greenhouseContainer">
            <table class="tg">
                <thead>
                <tr>
                    <th className="tg-0lax" colspan="5">Greenhouse List</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="tg-0lax">Name</td>
                    <td className="tg-0lax">Content</td>
                    <td className="tg-0lax">Description</td>
                    <td className="tg-0lax">Size</td>
                    <td className="tg-0lax"></td>
                </tr>
                {
                greenhouse.map(g => 
                        (
                        <>
                            <tr>
                                <td className="tg-0lax">{g.name}</td>
                                <td className="tg-0lax">{g.content}</td> 
                                <td className="tg-0lax">{g.description}</td>
                                <td className="tg-0lax">{g.size}</td>
                                <td className="tg-0lax" onClick={handleClickOpen} >
                                    <i className="deleteIcon fa-solid fa-trash-can"></i>
                                </td>
                            </tr>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">
                                {"Do you wish to delete selected greenhouse?"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    If you delete greenhouse you cant restore it. If you wish to not proceed you can press NO
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>NO</Button>
                                    <Button onClick={(e)=>deleteGreenhouse(g._id)} autoFocus>
                                        YES
                                    </Button> 
                                </DialogActions>
                            </Dialog>
                        </>
                        )
                    )
                } 
                </tbody>
            </table>
        </div>
        <i class="fa-solid fa-circle-plus"></i>
    </div>
  )
}
