import React from 'react';
import './co2Page.css';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import TimeKeeper from 'react-timekeeper'; 
import DatePicker from 'sassy-datepicker';
import {useState, useEffect} from 'react';

export default function CO2Page() {

  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm'); 
  const onChangeDate = (date) => {
    console.log(date.toString());
  };
  return (
    <div className='co2Page'>
      <Topbar />
      <Sidebar />      
      <div className="co2PageContainer">
        <div className='leftSideCO2Page'>
          <div className='leftSideUpCO2Page'></div>
          <div className='leftSideDownCO2Page'></div>
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
