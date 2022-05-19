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
                        <span>Lokacija: {weather ? weather.name : 'NaN'}</span>
                        <span>Vlaznost: {weather ? weather.main.humidity : 'NaN'} %</span>
                        <span>Temperatura: {weather ? Math.round(weather.main.temp)+' °C' : 'NaN'}</span>
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
