import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';


export default function TemperatureComponent() {
  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [location,setLocation] = useState('test');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const handleButton = () =>{
    if(auto===false){
      setAuto(true)
    }else{
      setAuto(false);
    }
  } 
  const pushNewTemp = async () => {
    const res = await axios.post('/api/temperature/new',{
      temperature:value,
      location:location,
      automatic:auto,  
    });
    setErrorMessage(`Temperature changed to : ${value} °C`);
    setTimeout(()=> {
      setErrorMessage()
    }, 1000);
  }; 
  useEffect(()=>{
    
  },[]);
  return (
    <div className='temperatureComponent'>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={pushNewTemp} onChange={handleChange}/>
            <Button onClick={handleButton} variant="contained">AUTO</Button>
            <span className='temperatureValue'>{value}°C</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
    );
}
