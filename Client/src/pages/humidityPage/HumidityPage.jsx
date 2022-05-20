import React from 'react'
import './humidityPage.css';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import TimeKeeper from 'react-timekeeper'; 
import DatePicker from 'sassy-datepicker';
import {useState, useEffect} from 'react';

export default function HumidityPage() {
  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm');
  
  const onChangeDate = (date) => {
    console.log(date.toString());
  };
  return (
    <div className='humidityPage'>
        <Topbar />
        <Sidebar />
        <div className="humidityPageContainer">
          <div className='leftSideHumidityPage'>
            <div className='leftUpHumidityPage'>
              <h1>Empty Widget</h1>
            </div>
            <div className='leftDownHumidityPage'>
                <h1>Empty Widget</h1>
            </div>
          </div>
          <div className='rightSideHumidityPage'>
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
