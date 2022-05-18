import React from 'react'
import './waterComponent.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';

export default function WaterComponent({loc}) { 

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{ 
    const fetch = async()=>{
      try{
        const res = await axios.get(`/api/water/green5`);
        console.log("RES WATER=>",res);
      }catch(err){
        console.log(err);
      }
    };
    fetch();
  },[]);

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
