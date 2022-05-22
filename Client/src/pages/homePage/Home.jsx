import React from 'react';
import './home.css';
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';
import WaterComponent from '../../components/waterComponent/WaterComponent';
import { useState, useEffect} from 'react';
import HumidityComponent from '../../components/humidityComponent/HumidityComponent';
import LightComponent from '../../components/lightComponent/LightComponent';
import CO2Component from '../../components/co2Component/CO2Component';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';


export default function Home() {
    const [location, setLocation] = useState('green1');
    const [loading, setLoading] = useState(false);

    const getName = async (location) =>{
        setLocation(location);
    }
    useEffect(()=>{
        setLoading(true);
    },[]);
    
    return (
        <div className='home'>
            <Sidebar />
            <Topbar getData={getName} />
            {
                loading ? 
                (<>
                    <div className='homeComponentsDiv'>
                        <TemperatureComponent loc={location} />
                        <WaterComponent loc={location} />
                        <NotificationComponent loc={location} />
                        <HumidityComponent loc={location} />
                        <LightComponent loc={location} />
                        <CO2Component loc={location} />
                    </div>
                    </> 
                ) 
                : 
                (<LoadingComponent />)
            }
        </div>
    );
}
