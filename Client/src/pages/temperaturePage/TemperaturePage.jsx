import React from 'react'
import './temperaturePage.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

export default function TemperaturePage() {

    const [value, setValue] = useState(33);
    const [auto,setAuto] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [button ,setButton] = useState('OFF');
    const [weather, setWeather] = useState(''); 
    const [dateTime, setDateTime] = useState('');

    const getDateTime = ()=>{
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes();
      const dateTime = date+' '+time;
      setDateTime(dateTime);
    }
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
      useEffect(()=>{
          const getWeather = async ()=>{
            const res = await axios.get(`/api/weather/${'Mostar'}`);
            setWeather(res.data);
            console.log(res.data);
        };  
        getWeather();
        getDateTime();
      },[])
  return (
    <div className='temperaturePage'>
        <Topbar />
        <Sidebar />
        <div className="containerTemperaturePage">
            <div className='leftSideTemperaturePage'>
                <div className='leftUpTemperatuePage'>
                    <div className='slideButtonHolderTemperaturePage'>
                        <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={''} onChange={handleChange}/>
                        <div className='spacer'></div>
                        <Button onClick={handleButton} variant="contained">AUTO  {button}</Button>
                    </div>
                    <div className='textHolderTemperaturePage'>
                        <span className='temperatureTextTempPage'>Temperature inside greenhouse : {'Green1'} is</span>
                        <span className='temperatureValueTempPage'>{'33'} °C</span>
                    </div>
                </div>
                <div className='leftDownTemperatuePage'>
                   <div className='weatherWidget'>
                     <div className='temperatureValueDiv'>
                        <span className='temperatureWidgetValue'>{weather ? Math.round(weather.main.temp)+' °C' : 'NaN'}</span>
                     </div>
                     <div className='humidityLocationDiv'>
                      <div>
                        <p>{dateTime}</p>
                        <span>Vlaznost: {weather ? weather.main.humidity : 'NaN'} %</span>
                      </div>
                      <div className='weatherDataLocationDiv'>
                          <i className="locationIcon fa-solid fa-location-dot"></i><span>Lokacija: {weather ? weather.name : 'NaN'}, {weather ? weather.sys.country : 'NaN'}</span>
                      </div>
                     </div>
                   </div>
                </div>
            </div>
            <div className='rightSideTemperaturePage'>
                <h1>Right</h1>
            </div>
        </div>
    </div>
  )
}
