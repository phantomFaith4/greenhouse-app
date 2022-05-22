import React from 'react'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {useState, useEffect} from 'react';
import './humidityComponent.css';


export default function HumidityComponent() {

  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
      setButton('ON');
    }else{
      setAuto(false);
      setButton('OFF');
    }
  } 

  return (
    <div className='humiditiyComponent'> 
        <div className='content'>
            <span className='widgetTitleHumidity'>HUMIDITIY</span>
            <div className='temperatureWidgetDiv'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange} />
              <Button onClick={handleButton} variant="contained">AUTO {button} </Button>
            </div>
            <span className='temperatureValue'>{'33'} %</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
  )
}
