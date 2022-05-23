import React from 'react'
import './lightComponent.css';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function LightComponent({loc}) {
  
  const [button ,setButton] = useState('OFF');
  const [auto,setAuto] = useState(false);
  const [button2 ,setButton2] = useState('OFF');
  const [auto2,setAuto2] = useState(false);

  const [errorMessage, setErrorMessage] = useState(''); 
  const [light, setLight] = useState('');
  const [update, setUpdate] = useState(false);


  const [button3 , setButton3] = useState('off');
  const[auto3,setAuto3] = useState(false);

  const updateLightCom = async () =>{
    try{
      const res = await axios.put(`/api/light/${loc}`,{
        run:auto,
      });
      setErrorMessage(`Light state changed update`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){   
      console.log(err); 
    }
  };
  const updateLightCom2 = async () =>{
    try{
      const res = await axios.put(`/api/light/${loc}`,{
        automatic:auto2,
      });
      setErrorMessage(`Light state changed update`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){   
      console.log(err); 
    }
  };
  const pushNewLight = async () => {
    try{
      const res = await axios.post('/api/light/new',{
        location:loc,
        run:auto,
      });
      setErrorMessage(`New Light added`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
    }
  }; 
  const pushNewLight2 = async () => {
    try{
      const res = await axios.post('/api/light/new',{
        location:loc,
        automatic:auto2
      });
      setErrorMessage(`New Light added`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
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
    update ? updateLightCom() : pushNewLight() ;
  } 
  const handleButton2 = () =>{
    if(auto2===false){
      setAuto2(true);
      setButton2('ON');
    }else{
      setAuto2(false); 
      setButton2('OFF'); 
    }
    update ? updateLightCom2() : pushNewLight2() ;
  } 
  useEffect(()=>{ 
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/light/${loc}`);
        setLight(res.data);
        setButton(res.data.run ? 'ON' : 'OFF'); 
        setButton2(res.data.automatic ? 'ON' : 'OFF'); 
        console.log(res.data);
        setUpdate(true);
      }catch(err){
        console.log(err);
        setUpdate(false);
      }
    };
    fetch(); 
  },[loc,auto,auto2]); 

  return ( 
    <div className='lightComponent'> 
      <div className='content'>
        <span className='widgetTitle'>LIGHT CONTROL</span>
        <div className='temperatureWidgetDiv'>
          <div className='ligtComponentButtonsDiv'>
            <Button onClick={handleButton} variant="contained">LIGHT {button} </Button>
            <Button onClick={handleButton2} variant="contained">AUTO {button2} </Button>
          </div>
        </div>
        <span className='lightValue'>{light ? light.intensity : 'NaN'} %</span>
      </div>  
        {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
    </div>
  )
}
