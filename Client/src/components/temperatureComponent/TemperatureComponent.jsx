import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function TemperatureComponent() {
  const [value, setValue] = React.useState(10);
  const handleChange = async (event, newValue) => {
    setValue(newValue);
    const res = await axios.post('http://localhost:8000/api/temperature/new',{
      temperature:value,
      automatic:false,
    })
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
