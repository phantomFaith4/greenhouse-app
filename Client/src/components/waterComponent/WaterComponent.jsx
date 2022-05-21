import React from 'react'
import './waterComponent.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';

export default function WaterComponent({loc}) { 

  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [auto,setAuto] = useState(false);
  const [button2 ,setButton2] = useState('OFF');
  const [auto2,setAuto2] = useState(false);
  const [water,setWater] = useState('');
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
    const fetch = async()=>{
      try{
        const res = await axios.get(`/api/water/${loc}`);
        setWater(res.data);
        console.log("RES WATER=>",res);
        res.data.automatic ? setButton('ON') : setButton('OFF');
        res.data.run ? setButton2('ON') : setButton2('OFF');
      }catch(err){
        console.log(err);
      }
    };
    fetch();
  },[loc]);

  return (
    <div className='waterComponent'>
      <div className='contentWater'>
          <span className='widgetTitleWater'>IRIGATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'>
              <Button onClick={handleButton} variant="contained">WATER {button}</Button>
              <Button onClick={handleButton2} variant="contained">AUTO {button2}</Button> 
            </div>
            <div className='waterButtonDiv2'>
              <span className=''>{water ? water.percentage : 'NaN'} %</span>
              {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
            </div>
      </div>
    </div>
  )
}
