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
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function CO2Page() {

  const [dateTime, setDateTime] = useState('');
  const [time, setTime] = useState('12:34pm'); 
  const [value, setValue] = useState(33);
  const [fan1,setFan1] = useState(false);
  const [fan2,setFan2] = useState(false);
  const [loc,setLoc] = useState('green1');
  const [co2, setCO2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [update,setUpdate] = useState(false);


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
  const getName = async (location) =>{
    setLoc(location);
  }
  const pushNewCO2 = async () => {
    try{
      const res = await axios.post('/api/co2/new',{
        location:loc,
        fan1:fan1,
        fan2:fan2,
        speed:value,
      });
      setErrorMessage(`Fan speed changed to : ${value} rpm`);
      setTimeout(()=> {
        setErrorMessage();
      }, 2500);
    }catch(err){
      console.log("Push new temperature ERROR=> ",err);
    }
  }; 
  const updateCO2 = async () =>{
    try{
      const res = await axios.put(`/api/co2/${loc}`,{
        fan1:fan1,
        fan2:fan2,
        speed:value,
      });
      setErrorMessage(`Fan speed updated to : ${value} rpm`);
      setTimeout(()=> {
        setErrorMessage();
      }, 2500);
    }catch(err){   
      console.log(err); 
    }
  };

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/co2/${loc}`);
        setCO2(res.data);
        setValue(res.data.speed)
        setFan2(res.data.fan2 ? true : false);
        setFan1(res.data.fan1 ? true : false)
        console.log("CO2 DATA=>",res);
        setUpdate(true);
      }catch(err){
        console.log(err);
        setUpdate(false);
      }
    };
    fetch();
  },[loc]);
  
  return (
    <div className='co2Page'>
      <Topbar getData={getName} />
      <Sidebar />      
      <div className="co2PageContainer">
        <div className='leftSideCO2Page'>
          <div className='leftSideUpCO2Page'>
            <div className='buttonsHolderCO2PageDiv'>
              <Slider value={value} aria-label="Default" valueLabelDisplay="auto"  onMouseUp={update ? updateCO2 : pushNewCO2} onChange={handleChange}/>
              <div className='switchCO2PageDiv'>
                <FormControlLabel value="start" control={<Switch checked={fan1} color="primary" />} label="Fan #1" labelPlacement="start"  onClick={handleSwitch1}/>
                <FormControlLabel value="start" control={<Switch checked={fan2} color="primary" />} label="Fan #2" labelPlacement="start"  onClick={handleSwitch2}/>
              </div>
            </div>
            <div className='textHolderWaterPage'>
              <span className='waterTextWaterPage'>Fan speed in  <span style={{fontWeight: "bold"}}>{co2 ? co2.location : 'NaN'}</span> is</span>
              <span className='waterValueWaterPage'>{value} rpm</span>
              <span className='waterTextWaterPage'>and amount of CO2 inside is</span>
              <span className='waterValueWaterPage'>{'600'} ppm</span>
            </div>
            {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
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
