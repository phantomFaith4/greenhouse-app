import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';


export default function TemperatureComponent({loc}) {
  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [update, setUpdate] = useState(false);

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
    }catch(err){   
      console.log(err); 
    }
  };
  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
      setButton('ON');
    }else{
      setAuto(false);
      setButton('OFF');
    }
    update ? updateTemp() : pushNewTemp();
  } 
  useEffect(()=>{
    console.log('TEST LOCATION=>',loc);
    const fetch = async () =>{
      try{
        const res = await axios.get(`/api/temperature/${loc}`);
        setValue(res.data.temperature);
        setButton(res.data.automatic ? 'ON' : 'OFF');
        setUpdate(true);
      }catch(err){
        console.log(err);
        setUpdate(false); 
      }
    } 
    fetch(); 
  },[loc,auto]);
  return (
    <div className='temperatureComponent'>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <div className='temperatureWidgetDiv'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={update ? updateTemp : pushNewTemp } onChange={handleChange}/>
              <Button onClick={handleButton} variant="contained">AUTO {button} </Button>
            </div>
            <span className='temperatureValue'>{value}°C</span>
            {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
    ); 
}
