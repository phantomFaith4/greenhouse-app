import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState } from 'react';


export default function TemperatureComponent() {
  const [value, setValue] = useState(10);
  const handleChange =  (event, newValue) => {
    setValue(newValue);
   /*  
    const res = await axios.post('/api/temperature/new',{
      temperature:value,
      automatic:false,  
    })
    console.log("test"); */
  }; 
  const pushNewTemp = async ()=>{
    setTimeout(()=> { 
      console.log("New Temp=>",value);
    }, 2000);
  };
  return (
        <div className='temperatureComponent'>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"   onChange={handleChange}/>
            <Button variant="contained">AUTO </Button>
            <span className='temperatureValue'>{value}°C</span>
          </div>
        </div>
    );
}
