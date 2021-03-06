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
import Alert from '@mui/material/Alert';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';


export default function WaterPage() {

  const [auto,setAuto] = useState(false);
  const [button ,setButton] = useState('OFF');
  const [value, setValue] = useState(33);
  const [errorMessage, setErrorMessage] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [time, setTime] = useState('12:34pm') 
  const [loc, setLoc] = useState('green1');
  const [water, setWater] = useState('');
  const [switchBtn, setSwitchBtn] = useState(false);
  const [update, setUpdate] = useState(false);
  const [upDate ,setUpDate] = useState(false);
  const [loading, setLoading] = useState(false);


  const OnOFf  = ()=>{
    if(switchBtn === false){
      setSwitchBtn(true);
    }else{
      setSwitchBtn(false);
    }
  }
  const getName = async (location) =>{
      setLoc(location);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue); 
  }; 
   const onChangeDate = async (date) => {
    try{
      const testDate = date.toString();
      const arr = testDate.split(' ')
      setDateTime(`${arr[3]}-${arr[1]}-${arr[2]}`)
    }catch(err){
 
    };
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
  const updateWaterAmount = async () =>{
    try{
      const res = await axios.put(`/api/water/${loc}`,{
            percentage: 75,
            automatic: auto,
            amount: value,
            fertilizer:switchBtn,
            time:time,
            date:dateTime, 
      });
      setErrorMessage(`Water amount updated to : ${value} ml/s`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log(err);
    }
  } ; 
  const addNewWater = async ()=>{
     try{
      const res = await axios.post(`/api/water/new`,{
            percentage: 75,
            location: loc,
            automatic: auto,
            amount: value,
            fertilizer:switchBtn,
            time:time,
            date:dateTime, 
      });
      setErrorMessage(`Water amount add to : ${value} ml/s`);
      setTimeout(()=> {
        setErrorMessage()
      }, 2500);
    }catch(err){
      console.log("ERROR ADING=>",err);
    } 
  };
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/water/${loc}`);
        setWater(res.data);
        setValue(res? res.data.amount : 0);
        setButton(res.data.automatic ? 'ON' : 'OFF');
        setSwitchBtn(res.data.fertilizer); 
        setTime(res.data.time);
        setDateTime(res.data.date ? res.data.date.toString() : '2022-May-21'); 
        setUpDate(false);
        console.log("water=>",res.data)
        setTimeout(()=> {
          setUpDate(true);
        }, 500);
        setUpdate(true);
        setLoading(true); 
      }catch(err){
        console.log(err);
        setUpDate(false);
        setTimeout(()=> {
          setUpDate(true);
        }, 500);
        setUpdate(false)
        setLoading(true); 
      }
    };
    fetch();
  },[loc]);
  return (
    <div className='waterPage'>
        <Topbar getData={getName} /> 
        <Sidebar />
        {
          loading ? 
          (
            <>
            <div className="waterPageContaier"> 
                <div className='leftSideWaterPage'> 
                    <div className='leftUpWaterPage'>
                        <div className='slideButtonHolderWaterPage'>
                          <div className='waterPageSliderAndSwitchDiv'>
                            <Slider value={value} aria-label="Default" valueLabelDisplay="auto" onChange={handleChange}/>
                            <FormControlLabel value="start" control={<Switch checked={switchBtn} onClick={OnOFf} color="primary" />} label="Fertilizer" labelPlacement="start" />
                          </div>
                            <div className='spacer'></div>
                            <div className='waterPageButtonDiv'>
                              <Button onClick={handleButton} variant="contained">AUTO  {button}</Button> 
                            </div>
                            <div className='textHolderWaterPage'>
                              <span className='waterTextWaterPage'>Amount of water going through tubes in <span style={{fontWeight: "bold"}}>{water ? water.location : 'NaN'}</span> is</span>
                              <span className='waterValueWaterPage'>{value} ml/s</span>
                              <span className='waterTextWaterPage'>and soil moisture is at</span>
                              <span className='waterValueWaterPage'>{water ? water.percentage : 'NaN'} %</span>
                            </div>
                       </div>
                       <div className='saveButton'>
                        <Button onMouseUp={update ? updateWaterAmount : addNewWater} variant="contained">Save</Button>
                      </div>
                       {errorMessage && <Alert variant="filled" severity="warning">{errorMessage}</Alert>  }
                    </div>
                    <div className='leftDownWaterPage'>
                      
                    </div>
                </div> 
                <div className='rightSideWaterPage'> 
                    <div className='timeHolderDiv'>
                      <TimeKeeper time={time} onChange={(newTime) => setTime(newTime.formatted12)} /> 
                    </div> 
                    <div className='dateHolderDiv'>
                      {
                        upDate ? (<DatePicker selected={new Date(dateTime)}  minDate={new Date()} onChange={onChangeDate} />) : ('false')
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
