import React from 'react'
import './lightComponent.css';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function LightComponent() {
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');

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
    <div className='lightComponent'> 
      <div className='content'>
            <span className='widgetTitle'>LIGHT CONTROL</span>
            <div className='temperatureWidgetDiv'>
              <div className='ligtComponentButtonsDiv'>
                <Button onClick={handleButton} variant="contained">LIGHT {button} </Button>
                <Button onClick={handleButton} variant="contained">AUTO {button} </Button>
              </div>
            </div>
            <span className='temperatureValue'>{'50'} %</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
  )
}
