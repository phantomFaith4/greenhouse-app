import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState } from 'react';
import Alert from '@mui/material/Alert';


export default function TemperatureComponent() {
  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
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
      automatic:auto,  
    });
    setErrorMessage("Temperature changed to : ");
  }; 
  return (
    <div className='temperatureComponent'>
          {errorMessage && <Alert variant="filled" severity="error">{errorMessage}</Alert>  }
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={pushNewTemp} onChange={handleChange}/>
            <Button onClick={handleButton} variant="contained">AUTO </Button>
            <span className='temperatureValue'>{value}°C</span>
          </div>
        </div>
    );
}
