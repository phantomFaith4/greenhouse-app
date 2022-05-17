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

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const handleButton = () =>{
    if(auto===false){
      setAuto(true)
    }else{
      setAuto(false);
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
    const fetch = async () =>{
      try{
        const res = await axios.get('/api/temperature/green2');
        console.log("Fetch data",res);
      }catch(err){
        console.log(err);
      }
    }
    const put = async () =>{
      try{
        const res = await axios.put('api/temperature/green2');
        console.log(res.data.location);
      }catch(err){   
        console.log(err);
      }
    };
    fetch();
    put();
  },[]);
  return (
    <div className='temperatureComponent'>
          <div className='content'>
            <span className='widgetTitle'>TEMPERATURE</span>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={pushNewTemp} onChange={handleChange}/>
            <Button onClick={handleButton} variant="contained">AUTO</Button>
            <span className='temperatureValue'>{value}°C</span>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
          </div> 
    </div>
    );
}
