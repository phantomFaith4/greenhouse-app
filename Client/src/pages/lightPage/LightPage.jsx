import React from 'react'
import './lightPage.css';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TimeKeeper from 'react-timekeeper'; 
import DatePicker from 'sassy-datepicker';
import {useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

export default function LightPage() { 

  const [button ,setButton] = useState('OFF');
  const [run, setRun] = useState(false);
  
  const [value, setValue] = useState(33);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [time, setTime] = useState('12:35pm'); 
  const [update, setUpdate] = useState(false);
  const [loc,setLoc] = useState('green1');
  const [light, setLight] = useState('');
  const [upDate ,setUpDate] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
  const getName = async (location) =>{
    setLoc(location);
  }
  const onChangeDate = async (date) => {
    try{
      const testDate = date.toString();
      const arr = testDate.split(' ') 
      setDateTime(`${arr[3]}-${arr[1]}-${arr[2]}`)
      return(<p>asdasdasd</p>);
    }catch(err){
 
    };
  };
  const pushNewLight = async () => {
    try{
      const res = await axios.post('/api/light/new',{
        location:loc,
        intensity:value,
        run:run,
        time:time,
        date:dateTime,
      });
      setErrorMessage(`Light intensity changed to : ${value} %`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
    }
  }; 
  const updateLight = async () =>{
    try{
      const res = await axios.put(`/api/light/${loc}`,{
        intensity:value,
        run:run,
        time:time,
        date:dateTime,
      });
      setErrorMessage(`Light intensity updated to : ${value} %`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){   
      console.log(err); 
    }
  };
  const handleButton = () =>{
    if(run === false){
      setRun(true);
      setButton('ON');
    }else{
      setRun(false);
      setButton('OFF');
    }
  };
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/light/${loc}`);
        setLight(res.data);
        setValue(res.data.intensity)
        setButton(res.data.run ? 'ON' : 'OFF');
        setTime(res.data.time);
        setDateTime(res.data.date.toString());
        setUpDate(false);
        setTimeout(()=> {
          setUpDate(true); 
        }, 500);
        setUpdate(true);
        setLoading(true); 
      }catch(err){
        console.log(err);
        setUpdate(false);
        setUpDate(false);
        setTimeout(()=> {
          setUpDate(true); 
        }, 500);
        setLoading(true); 
      } 
    };
    fetch();
  },[loc]);

  return (
    <div className='lightPage'> 
      <Topbar getData={getName} />
      <Sidebar />
      {
        loading ? 
        (
          <>
          <div className="lightPageContainer">
            <div className='leftSideLigtPage'>
              <div className='leftSideUpLightPage'>
                <div className='slideButtonHolderTemperaturePage'>
                  <Slider value={value} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange}/>
                  <div className='spacer'></div>
                  <div className='buttonHolderLightPageDiv'>
                    <Button onClick={handleButton} variant="contained">TURN  {button}</Button>
                    {/* <Button onClick={handleButton2}  variant="contained">AUTO  {button2}</Button> */}
                  </div>
                </div>
                <div className='textHolderTemperaturePage'>
                  <span className='lightTextLightPage'>Light intensity inside greenhouse : <span style={{fontWeight: "bold"}}>{light ? light.location : 'NaN'}</span> is</span>
                  <span className='temperatureValueTempPage'>{value} %</span>
                </div>
                <div className='saveButton'>
                  <Button onMouseUp={update ? updateLight : pushNewLight } variant="contained">Save</Button>
                </div>
                {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
              </div>
              <div className='leftSideDownLightPage'>
                
              </div>
            </div>
            <div className='rightSideLigtPage'>
              <div className='timeHolderDivLightPage'>
                <TimeKeeper time={time} onChange={(newTime) => setTime(newTime.formatted12)} /> 
              </div> 
              <div className='dateHolderDivLightPage'>
                {
                  upDate ? (<DatePicker selected={new Date(dateTime)} minDate={new Date()} onChange={onChangeDate} />) : ('false')
                }
              </div>  
            </div>
          </div>
          </>
        )
        :
        (<LoadingComponent />)
      }
    </div>
  )
}
