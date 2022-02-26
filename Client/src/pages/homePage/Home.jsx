import React from 'react';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import './home.css';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';
import { useState, useEffect} from 'react';


export default function Home() {
    const [user,setUser] = useState([]);
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')));
    },[]); 
    console.log("Home local storage=> ",user);
    return (
        <div className='home'> 
            <Sidebar />
            <Topbar />
            <div className='homeComponentsDiv'>
                <TemperatureComponent />
                <TemperatureComponent />
                <TemperatureComponent />
                <TemperatureComponent />
                <NotificationComponent />
                <NotificationComponent />
                <NotificationComponent />
                <NotificationComponent />
                <NotificationComponent />
                <NotificationComponent />
            </div>
        </div>
    );
}
