import React from 'react';
import './co2Page.css';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import TimeKeeper from 'react-timekeeper'; 
import DatePicker from 'sassy-datepicker';
import {useState, useEffect} from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import FanComponent from '../../components/fanComponent/FanComponent';

export default function CO2Page() {

  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm'); 
  const [value, setValue] = useState(33);

  const [fan1,setFan1] = useState(false);
  const [fan2,setFan2] = useState(false);

  const onChangeDate = (date) => {
    console.log(date.toString());
  };
  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const handleSwitch1 = () => {
    fan1 ? setFan1(false) : setFan1(true);
  }; 
  const handleSwitch2 = () => {
    fan2 ? setFan2(false) : setFan2(true);
  }; 
  return (
    <div className='co2Page'>
      <Topbar />
      <Sidebar />      
      <div className="co2PageContainer">
        <div className='leftSideCO2Page'>
          <div className='leftSideUpCO2Page'>
            <div className='buttonsHolderCO2PageDiv'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={''} onChange={handleChange}/>
              <div className='switchCO2PageDiv'>
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Fan #1" labelPlacement="start"  onClick={handleSwitch1}/>
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Fan #2" labelPlacement="start"  onClick={handleSwitch2}/>
              </div>
            </div>
            <div className='textHolderWaterPage'>
              <span className='waterTextWaterPage'>Fan speed in  <span style={{fontWeight: "bold"}}>{'Green1'}</span> is</span>
              <span className='waterValueWaterPage'>{'33'} rpm</span>
            </div>
          </div>
          <div className='leftSideDownCO2Page'>
            <div className='fanHolderDiv'>
              <FanComponent spin={fan1}/>
              <FanComponent spin={fan2}/>
            </div>
          </div> 
        </div>
        <div className='rightSideCO2Page'>
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
