import React from 'react'
import './waterComponent.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';

export default function WaterComponent() {

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className='waterComponent'>
      <div className='contentWater'>
          <span className='widgetTitleWater'>IRIGATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'>
              <Button variant="contained">WATER</Button>
              <Button variant="contained">AUTO</Button> 
            </div>
            <div className='waterButtonDiv2'>
              <span className=''>75 %</span>
              {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
            </div>
      </div>
    </div>
  )
}
