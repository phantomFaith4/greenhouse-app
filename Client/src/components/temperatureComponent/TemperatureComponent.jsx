import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import * as notificationOperation from '../PushNotification/pushNotification.js';
import Button from '@mui/material/Button';

export default function TemperatureComponent({loc}) {
  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [update, setUpdate] = useState(false);
  const [loca ,setLoca] = useState('');

  const [test,setTest] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const pushNewTemp = async () => {
    try{
      const res = await axios.post('/api/temperature/new',{
        temperature:value,
        location:loc,
        automatic:auto,  
      });
      setErrorMessage(`Temperature changed to : ${value} °C`);
      setTimeout(()=> {
        setErrorMessage()
      }, 1000);
      notificationOperation.newNotification(`Temperature changed to: ${value} °C`, loc);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
    }
  }; 
  const updateTemp = async () =>{
    try{
      const res = await axios.put(`/api/temperature/${loc}`,{
        temperature: value,
        automatic: auto, 
      });
      setErrorMessage(`Temperature updated to : ${value} °C`);
      setTimeout(()=> {
        setErrorMessage()
      }, 1000);
      notificationOperation.newNotification(`Temperature updated to: ${value} °C`, loc);
    }catch(err){   
      console.log(err); 
    }
  }; 
  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
    }else{
      setAuto(false);
    }
    update ? updateTemp() : pushNewTemp();
  } 
  useEffect(()=>{
    setLoca(loc);
    const fetch = async () =>{
      try{
        const res = await axios.get(`/api/temperature/${loc}`);
        setValue(res.data.temperature);
        setButton(res.data.automatic ? 'ON' : 'OFF');
        setTest(true);
        setUpdate(true);
      }catch(err){
        console.log(err);
        setUpdate(false);
        setTest(false); 
      }
    } 
    fetch(); 
  },[loc,auto,loca]);
  return (
    <div className='temperatureComponent'>
      {
        test ? 
        (
          <>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <div className='temperatureWidgetDiv'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={update ? updateTemp : pushNewTemp } onChange={handleChange}/>
              <Button className='' onClick={handleButton} variant="contained">AUTO {button} </Button>
            </div>
            <span className='temperatureValue'>{value}°C</span>
            {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
          </>
        )
        :
        (
          <>
          <p>No temperature data for this greenhoues</p>
          </>
        )
      }
    </div>
    ); 
}
