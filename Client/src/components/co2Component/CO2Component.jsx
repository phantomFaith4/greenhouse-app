import React from 'react'
import './co2Component.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
export default function CO2Component() {

    const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className='co2Component'>
        <div className='contentWater'>
          <span className='widgetTitleWater'>CO2 REGULATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'> 
              <Button variant="contained">TURN {'ON'}</Button>
              <Button variant="contained">AUTO</Button> 
            </div>
            <div className='waterButtonDiv2'> 
              <span className=''>{600} ppm</span>
              {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
            </div>
      </div>
    </div>
  )
}
