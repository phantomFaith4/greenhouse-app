import React from 'react';
import './temperatureComponent.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';


export default function TemperatureComponent({loc}) {
  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const  [button ,setButton] = useState('OFF');
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
  const pushNewTemp = async () => {
    try{
      const res = await axios.post('/api/temperature/new',{
        temperature:value,
        location:loc,
        automatic:auto,  
      });
      setErrorMessage(`Temperature changed to : ${value} °C`);
      setTimeout(()=> {
        setErrorMessage()
      }, 1000);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
    }
  }; 
  useEffect(()=>{
    console.log('TEST LOCATION=>',loc);
    const fetch = async () =>{
      try{
        const res = await axios.get(`/api/temperature/${loc}`);
        console.log("Fetch data=>",res.data," at location=> ",loc);
        setValue(res.data.temperature);
        setAuto(res.data.automatic);
      }catch(err){
        console.log(err);
      }
    } 
    const put = async () =>{
      try{
        const res = await axios.put(`/api/temperature/${loc}`);
        console.log(res.data.location);
      }catch(err){   
        console.log(err); 
      }
    };
    fetch();
    put();
  },[loc]);

  return (
    <div className='temperatureComponent'>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={pushNewTemp} onChange={handleChange}/>
            <Button onClick={handleButton} variant="contained">AUTO {button} </Button>
            <span className='temperatureValue'>{value}°C</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
    );
}
