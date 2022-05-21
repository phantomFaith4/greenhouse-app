import React from 'react'
import './waterPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TimeKeeper from 'react-timekeeper';
import DatePicker from 'sassy-datepicker';
import Alert from '@mui/material/Alert';

export default function WaterPage() {

  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm') 
  const [loc, setLoc] = useState('green1');
  const [water, setWater] = useState('');
  const [switchBtn, setSwitchBtn] = useState(false);
  const [update, setUpdate] = useState(false);

  const OnOFf  = ()=>{
    if(switchBtn === false){
      setSwitchBtn(true);
    }else{
      setSwitchBtn(false);
    }
  }
  const getName = async (location) =>{
      setLoc(location);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const onChangeDate = (date) => {
    console.log(date.toString());
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
  const updateWaterAmount = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            automatic: auto,
            amount: value,
            fertilizer:switchBtn,
      });
      console.log("percentage:",75,"automatic:",auto,"amount:",value,"fertilzier:",switchBtn,"--location-->",loc);
    }catch(err){
      console.log(err);
    }
  } ; 
  const addNewWater = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            percentage: 75,
            location: loc,
            automatic: auto,
            amount: value,
            fertilizer:switchBtn, 
      });
      setErrorMessage(`Water amount add to : ${value} ml/s`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/water/${loc}`);
        setWater(res.data);
        setValue(res? res.data.amount : 0);
        setButton(res.data.automatic ? 'ON' : 'OFF');
        setSwitchBtn(res.data.fertilizer);
        setUpdate(true);
      }catch(err){
        setUpdate(false)
        console.log(err);
      }
    };
    fetch();
  },[loc]);
  return (
    <div className='waterPage'>
        <Topbar getData={getName} /> 
        <Sidebar />
        <div className="waterPageContaier"> 
            <div className='leftSideWaterPage'> 
                <div className='leftUpWaterPage'>
                    <div className='slideButtonHolderWaterPage'>
                      <div className='waterPageSliderAndSwitchDiv'>
                        <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={update ? updateWaterAmount : addNewWater} onChange={handleChange}/>
                        <FormControlLabel value="start" control={<Switch checked={switchBtn} onClick={OnOFf} color="primary" />} label="Fertilizer" labelPlacement="start" />
                      </div>
                        <div className='spacer'></div>
                        <div className='waterPageButtonDiv'>
                          <Button onClick={handleButton} variant="contained">AUTO  {button}</Button> 
                        </div>
                        <div className='textHolderWaterPage'>
                          <span className='waterTextWaterPage'>Amount of water going through tubes in <span style={{fontWeight: "bold"}}>{water ? water.location : 'NaN'}</span> is</span>
                          <span className='waterValueWaterPage'>{value} ml/s</span>
                          <span className='waterTextWaterPage'>and soil moisture is at</span>
                          <span className='waterValueWaterPage'>{water ? water.percentage : 'NaN'} %</span>
                        </div>
                   </div>
                   {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
                </div>
                <div className='leftDownWaterPage'>
                  
                </div>
            </div> 
            <div className='rightSideWaterPage'> 
                <div className='timeHolderDiv'>
                  <TimeKeeper time={time} onChange={(newTime) => setTime(newTime.formatted12)} /> 
                </div> 
                <div className='dateHolderDiv'>
                   <DatePicker onChange={onChangeDate} />
                </div>  
            </div>
        </div>   
        </div>
  )
}
