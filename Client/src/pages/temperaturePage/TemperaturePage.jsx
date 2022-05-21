import React from 'react'
import './temperaturePage.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TimeKeeper from 'react-timekeeper';
import DatePicker from 'sassy-datepicker';


export default function TemperaturePage() {

    const [value, setValue] = useState(33);
    const [auto,setAuto] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [button ,setButton] = useState('OFF');
    const [weather, setWeather] = useState(''); 
    const [dateTime, setDateTime] = useState('');
    const [time, setTime] = useState('12:34pm') 
    const [location,setLocation] = useState('green1');
    const [temp, setTemp] = useState('');
    const [update, setUpdate] = useState(false);

    const getName = async (location) =>{
      setLocation(location);
    }
    const getDateTime = ()=>{
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes();
      const dateTime = date+' '+time;
      setDateTime(dateTime);
    }
    const onChangeDate = (date) => {
      console.log(date.toString());
    };
    
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
      const getWeather = async ()=>{
        const loc = await axios.get(`/api/greenhouse/${location}`);
        try{
          const res = await axios.get(`/api/weather/${loc.data.location}`);
          setWeather(res.data);
        }catch(err){
          console.log(err);
        }
    };
    const pushNewTemp = async () => {
      try{
        const res = await axios.post('/api/temperature/new',{
          temperature:value,
          location:location,
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
    const updateTemp = async () =>{
      try{
        const res = await axios.put(`/api/temperature/${location}`,{
          temperature: value,
          automatic: auto, 
        });
        setErrorMessage(`Temperature updated to : ${value} °C`);
        setTimeout(()=> {
          setErrorMessage()
        }, 1000);
      }catch(err){   
        console.log(err); 
      }
    };  
      useEffect(()=>{
        const fetch = async ()=>{
          try{
            const res = await axios.get(`/api/temperature/${location}`);
            setTemp(res.data);
            setUpdate(true);
            setButton(res.data.automatic ? 'ON' : 'OFF');
            console.log(res.data);
          }catch(err){
            console.log(err);
            setUpdate(false);
          }
        };
        fetch();
        getWeather();
        getDateTime();
      },[location])
  return (
    <div className='temperaturePage'>
        <Topbar getData={getName} />
        <Sidebar />
        <div className="containerTemperaturePage">  
            <div className='leftSideTemperaturePage'>
                <div className='leftUpTemperatuePage'>
                    <div className='slideButtonHolderTemperaturePage'>
                        <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={update ? updateTemp : pushNewTemp} onChange={handleChange}/>
                        <div className='spacer'></div>
                        <Button onClick={handleButton} variant="contained">AUTO  {button}</Button>
                    </div>
                    <div className='textHolderTemperaturePage'>
                        <span className='temperatureTextTempPage'>Temperature inside greenhouse : <span style={{fontWeight: "bold"}}>{temp ? temp.location : 'NaN'}</span> is</span>
                        <span className='temperatureValueTempPage'>{temp ? temp.temperature : 'NaN'} °C</span>
                    </div>
                </div>
                <div className='leftDownTemperatuePage'>
                   <div className='weatherWidget'>
                     <div className='temperatureValueDiv'>
                        <span className='temperatureWidgetValue'>{weather ? Math.round(weather.main.temp)+' °C' : 'NaN'}</span>
                     </div>
                     <div className='humidityLocationDiv'>
                      <div className='humidityDataDiv'>  
                        <p className='dateTimePara'>{dateTime}</p>
                        <i class="humidityIcon fa-solid fa-droplet"></i><span>{weather ? weather.main.humidity : 'NaN'} %</span>
                      </div>
                      <div className='weatherDataLocationDiv'>
                          <i className="locationIcon fa-solid fa-location-dot"></i><span>{weather ? weather.name : 'NaN'}, {weather ? weather.sys.country : 'NaN'}</span>
                      </div>
                     </div>
                   </div>
                </div>
            </div> 
            <div className='rightSideTemperaturePage'> 
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
