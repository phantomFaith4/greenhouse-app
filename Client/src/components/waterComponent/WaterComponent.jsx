import React from 'react'
import './waterComponent.css';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import {useState, useEffect } from 'react';
import * as notificationOperation from '../PushNotification/pushNotification.js';
import Button from '@mui/material/Button';

export default function WaterComponent({loc}) { 

  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [auto,setAuto] = useState(false);
  const [button2 ,setButton2] = useState('OFF');
  const [auto2,setAuto2] = useState(false);
  const [water,setWater] = useState('');
  const [update, setUpdate] = useState(false);
  const [loca ,setLoca] = useState('');

  const updateWaterAmountComp = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            automatic: auto,
      });
      setErrorMessage(`Automatic watering:  ${button}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
      notificationOperation.newNotification(`Automatic watering:  ${water.automatic ? 'off' : 'on'}`, loc);
    }catch(err){
      console.log(err);
    }
  } ; 
  const addNewWaterComp = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            location: loc,
            automatic: auto,
      });
      setErrorMessage(`Automatic watering: ${button}`);
      notificationOperation.newNotification(`Automatic watering: ${water.automatic ? 'off' : 'on'}`, loc);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  const updateWaterAmount2Comp = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            water:auto2,
      });
      setErrorMessage(`Watering ${button2}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
      notificationOperation.newNotification(`Watering: ${water.water ? 'off' : 'on'}`, loc);
    }catch(err){
      console.log(err);
    }
  }; 
  const addNewWater2Comp = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            location: loc,
            water:auto2,
      });
      setErrorMessage(`Watering ${button2}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
      notificationOperation.newNotification(`Watering: ${water.water ? 'off' : 'on'}`, loc);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
    }else{
      setAuto(false);
    }
    update ? updateWaterAmountComp() : addNewWaterComp();
  } 
  const handleButton2 = () =>{
    if(auto2===false){
      setAuto2(true);
    }else{
      setAuto2(false);
    }
    update ? updateWaterAmount2Comp() : addNewWater2Comp();
  } 

  useEffect(()=>{
    setLoca(loc); 
    const fetch = async () =>{
      try{
        const res = await axios.get(`/api/water/${loc}`);
        setWater(res.data);
        setButton(res.data.automatic ? 'ON' : 'OFF');
        setButton2(res.data.water ? 'ON' : 'OFF');
        setUpdate(true); 
      }catch(err){
        console.log(err);
        setUpdate(false);
      }
    };
    fetch(); 
  },[loc,auto,auto2,loca]);

  return (
    <div className='waterComponent'>
      <div className='contentWater'>
          <span className='widgetTitleWater'>IRIGATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'>
              <Button onClick={handleButton2} variant="contained">WATER {button2}</Button>
              <Button onClick={handleButton} variant="contained">AUTO {button}</Button> 
            </div>
            <div className='waterButtonDiv2'>
              <span className=''>{water ? water.percentage : 'NaN'} %</span>
            </div>
      </div>
      {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
    </div>
  )
}
