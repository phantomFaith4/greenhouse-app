import React from 'react';
import './home.css';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';
import WaterComponent from '../../components/waterComponent/WaterComponent';

import { useState, useEffect} from 'react';

export default function Home() {
    const [user,setUser] = useState([]);
    const [location, setLocation] = useState('green1');
    const getName = async (location) =>{
        setLocation(location);
    }
    useEffect(()=>{
        try{
            setUser(JSON.parse(localStorage.getItem('user')));
        }catch(err){

        };
    },[]); 
    return (
        <div className='home'> 
            <Sidebar />
            <Topbar getData={getName} />
            <div className='homeComponentsDiv'>
                <TemperatureComponent loc={location} />
                <NotificationComponent loc={location} />
                <WaterComponent />
            </div>
        </div>
    );
}
