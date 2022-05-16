import React from 'react';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import './home.css';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';
import { useState, useEffect} from 'react';


export default function Home() {
    const [user,setUser] = useState([]);
    const [location, setLocation] = useState('Multiverse');
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')));
    },[]); 
    //console.log("Home local storage=> ",user); 
    const getName = (location) =>{
        setLocation(location);
    }
    return (
        <div className='home'> 
            <Sidebar />
            <Topbar getData={getName} />
            <div className='homeComponentsDiv'>
                <TemperatureComponent loc={location} />
                <TemperatureComponent />
                <TemperatureComponent />
                <TemperatureComponent />
                <NotificationComponent />
                <TemperatureComponent /> 
                <TemperatureComponent />
                <TemperatureComponent />
                <TemperatureComponent />
                <TemperatureComponent />
            </div>
        </div>
    );
}
