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
  const [update, setUpdate] = useState(false);


  const updateWaterAmountComp = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            automatic: auto,
      });
      setErrorMessage(`Automatic ${button}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log(err);
    }
  } ; 
  const addNewWaterComp = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            location: loc,
            automatic: auto,
      });
      setErrorMessage(`Automatic ${button}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  const updateWaterAmount2Comp = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            water:auto2,
      });
      setErrorMessage(`Automatic ${button}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log(err);
    }
  } ; 
  const addNewWater2Comp = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            location: loc,
            water:auto2,
      });
      setErrorMessage(`Automatic ${button}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  const handleButton = () =>{
    if(auto===false){
      setAuto(true);
      setButton('ON');
    }else{
      setAuto(false);
      setButton('OFF');
    }
    update ? updateWaterAmountComp() : addNewWaterComp();
  } 
  const handleButton2 = () =>{
    if(auto2===false){
      setAuto2(true);
      setButton2('ON');
    }else{
      setAuto2(false);
      setButton2('OFF');
    }
    update ? updateWaterAmount2Comp() : addNewWater2Comp();
  } 

  useEffect(()=>{ 
    const fetch = async () =>{
      try{
        const res = await axios.get(`/api/water/${loc}`);
        setWater(res.data);
        res.data.automatic ? setButton('ON') : setButton('OFF');
        res.data.water ? setButton2('ON') : setButton2('OFF');
        setUpdate(true); 
      }catch(err){
        console.log(err);
        setUpdate(false);
      }
    };
    fetch(); 
  },[loc,auto,auto2]);

  return (
    <div className='waterComponent'>
      <div className='contentWater'>
          <span className='widgetTitleWater'>IRIGATION</span>
      </div>
      <div className='waterButtonDiv'>
            <div className='waterButtonDiv1'>
              <Button onClick={handleButton2} variant="contained">WATER {button2}</Button>
              <Button onClick={handleButton} variant="contained">AUTO {button}</Button> 
            </div>
            <div className='waterButtonDiv2'>
              <span className=''>{water ? water.percentage : 'NaN'} %</span>
              {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
            </div>
      </div>
    </div>
  )
}
