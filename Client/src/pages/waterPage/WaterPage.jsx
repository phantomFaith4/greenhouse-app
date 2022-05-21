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


export default function WaterPage() {

  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm') 
  const [location, setLocation] = useState('green1');
  const [water, setWater] = useState('');

  const getName = async (location) =>{
      setLocation(location);
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
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/water/${location}`);
        setWater(res.data);
        setValue(res? res.data.amount : 0); 
      }catch(err){
        console.log(err);
      }
    };
    fetch();
  },[location]);
  return (
    <div className='waterPage'>
        <Topbar getData={getName} /> 
        <Sidebar />
        <div className="waterPageContaier"> 
            <div className='leftSideWaterPage'> 
                <div className='leftUpWaterPage'>
                    <div className='slideButtonHolderWaterPage'>
                      <div className='waterPageSliderAndSwitchDiv'>
                        <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={''} onChange={handleChange}/>
                        <FormControlLabel value="start" control={<Switch color="primary" />} label="Fertilizer" labelPlacement="start" />
                      </div>
                        <div className='spacer'></div>
                        <div className='waterPageButtonDiv'>
                          <Button onClick={handleButton} variant="contained">AUTO  {button}</Button> 
                        </div>
                        <div className='textHolderWaterPage'>
                          <span className='waterTextWaterPage'>Amount of water going through tubes in <span style={{fontWeight: "bold"}}>{water ? water.location : 'NaN'}</span> is</span>
                          <span className='waterValueWaterPage'>{water ? water.amount : 'NaN'} ml/s</span>
                          <span className='waterTextWaterPage'>and soil moisture is at</span>
                          <span className='waterValueWaterPage'>{water ? water.percentage : 'NaN'} %</span>
                        </div>
                   </div>
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
