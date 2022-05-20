import React from 'react'
import './lightPage.css';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TimeKeeper from 'react-timekeeper'; 
import DatePicker from 'sassy-datepicker';
import {useState, useEffect} from 'react';

export default function LightPage() {

  const [value, setValue] = useState(33);
  const [auto,setAuto] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [button ,setButton] = useState('OFF');
  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm'); 

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
 
  },[]);

  return (
    <div className='lightPage'> 
      <Topbar />
      <Sidebar />
      <div className="lightPageContainer">
        <div className='leftSideLigtPage'>
          <div className='leftSideUpLightPage'>
            <div className='slideButtonHolderTemperaturePage'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={''} onChange={handleChange}/>
              <div className='spacer'></div>
              <div className='buttonHolderLightPageDiv'>
                <Button onClick={handleButton} variant="contained">TURN  {button}</Button>
                <Button onClick={handleButton} variant="contained">AUTO  {button}</Button>
              </div>
            </div>
            <div className='textHolderTemperaturePage'>
              <span className='lightTextLightPage'>Light intensity inside greenhouse : <span style={{fontWeight: "bold"}}>{'Green1'}</span> is</span>
              <span className='temperatureValueTempPage'>{value} %</span>
            </div>
          </div>
          <div className='leftSideDownLightPage'>
            
          </div>
        </div>
        <div className='rightSideLigtPage'>
          <div className='timeHolderDivLightPage'>
            <TimeKeeper time={time} onChange={(newTime) => setTime(newTime.formatted12)} /> 
          </div> 
          <div className='dateHolderDivLightPage'>
              <DatePicker onChange={onChangeDate} />
          </div>  
        </div>
      </div>
    </div>
  )
}
