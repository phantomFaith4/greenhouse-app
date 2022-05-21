import React from 'react'
import './co2Component.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CO2Component({loc}) {

  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [auto,setAuto] = useState(false);
  const [button2 ,setButton2] = useState('OFF');
  const [auto2,setAuto2] = useState(false);
  const [CO2,setCO2] = useState('');

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
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/co2/${loc}`);
        res.data.fan ? setButton('ON') : setButton('OFF');
        res.data.run ? setButton2('ON') : setButton2('OFF');
      }catch(err){
        console.log(err);
      }
    };
    fetch();
  },[loc]);

  return (
    <div className='co2Component'>
        <div className='contentWater'>
          <span className='widgetTitleWater'>CO2 REGULATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'> 
              <Button onClick={handleButton} variant="contained">TURN {button}</Button>
              <Button onClick={handleButton2} variant="contained">AUTO {button2}</Button> 
            </div>
            <div className='waterButtonDiv2'> 
              <span className=''>{600} ppm</span>
              {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
            </div>
      </div>
    </div>
  )
}
