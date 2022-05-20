import React from 'react'
import './lightComponent.css';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function LightComponent() {
  const [auto, setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [button2 ,setButton2] = useState('OFF');
  const [auto2, setAuto2] = useState(false);

  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
      setButton('ON');
    }else{
      setAuto(false);
      setButton('OFF');
    }
  } 
  const handleButton2 = () =>{
    if(auto2===false){
      setAuto2(true);
      setButton2('ON');
    }else{
      setAuto2(false);
      setButton2('OFF');
    }
  } 

  return (
    <div className='lightComponent'> 
      <div className='content'>
            <span className='widgetTitle'>LIGHT CONTROL</span>
            <div className='temperatureWidgetDiv'>
              <div className='ligtComponentButtonsDiv'>
                <Button onClick={handleButton2} variant="contained">LIGHT {button2} </Button>
                <Button onClick={handleButton} variant="contained">AUTO {button} </Button>
              </div>
            </div>
            <span className='temperatureValue'>{'50'} %</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div>  
    </div>
  )
}
