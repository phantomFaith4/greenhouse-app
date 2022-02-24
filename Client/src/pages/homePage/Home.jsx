import React from 'react';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import './home.css';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';

export default function Home() {
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
