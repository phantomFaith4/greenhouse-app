import React from 'react'
import './co2Component.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CO2Component({loc}) {

  const [errorMessage, setErrorMessage] = useState('');
  const [CO2,setCO2] = useState('');
  
  const [button ,setButton] = useState('OFF');
  const [auto,setAuto] = useState(false);
  
  const [button2 ,setButton2] = useState('OFF');
  const [auto2,setAuto2] = useState(false);

  const [update, setUpdate] = useState(false);

  const pushNewCO2Comp = async () => {
    try{
      const res = await axios.post('/api/co2/new',{
        location:loc,
        run:auto,
        fan1:auto,
        fan2:auto,
      });
      setErrorMessage(`Fan turned on  new`);
      setTimeout(()=> {
        setErrorMessage();
      }, 2500);
    }catch(err){
      console.log("Push new CO2 ERROR=> ",err);
    }
  }; 
  const updateCO2Comp = async () =>{
    try{
      const res = await axios.put(`/api/co2/${loc}`,{
      run:auto,
      fan1:auto,
      fan2:auto,
      });
      setErrorMessage(`Fan turned ON Update`);
      setTimeout(()=> {
        setErrorMessage();
      }, 2500);
    }catch(err){   
      console.log(err); 
    }
  };
  const pushNewCO2Comp2 = async () => {
    try{
      const res = await axios.post('/api/co2/new',{
        location:loc,
        automatic:auto2,
      });
      setErrorMessage(`Fan turned to automatic new`);
      setTimeout(()=> { 
        setErrorMessage();
      }, 2500); 
    }catch(err){
      console.log("Push new CO2 ERROR=> ",err);
    }
  }; 
  const updateCO2Comp2 = async () =>{
    try{
      const res = await axios.put(`/api/co2/${loc}`,{
        automatic:auto2, 
      });
      setErrorMessage(`Fan turned to automatic update`);
      setTimeout(()=> {
        setErrorMessage();
      }, 2500);
    }catch(err){   
      console.log(err); 
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
    update ? updateCO2Comp() : pushNewCO2Comp();
  } 
  const handleButton2 = () =>{
    if(auto2 === false){
      setAuto2(true);
      setButton2('ON'); 
    }else{
      setAuto2(false);
      setButton2('OFF'); 
    }
    update ? updateCO2Comp2() : pushNewCO2Comp2();
  } 
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/co2/${loc}`);
        res.data.run ? setButton('ON') : setButton('OFF');
        setButton2(res.data.automatic ? 'ON' : 'OFF');
        setUpdate(true);
      }catch(err){
        console.log(err);
        setUpdate(false);
      }
    };
    fetch();
  },[loc,auto,auto2]);

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
            </div>
          {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
      </div>
    </div>
  )
}
