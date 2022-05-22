import React from 'react'
import Sidebar from '../../components/sidebarComponent/Sidebar';
import Topbar from '../../components/topbarComponent/Topbar';
import './account.css';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserSettings from '../../components/userSettingsComponent/UserSettings';
import GreenhouseSettingsComponent from '../../components/greenhouseSettingsComponent/GreenhouseSettingsComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';


export default function Account(props) {

  const [loading, setLoading] = useState(false);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
   function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    setLoading(true);
  },[]);
  return (
    <div className='account'>
      <Topbar />
      <Sidebar />
      {
        loading ? 
        (
          <>
          <div className="accountComponents">
            <div className='tabHolder'>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="User settings"  />
                <Tab label="Greenhouse settings" />
                <Tab label="Notification settings"  />
                <Tab label="Privacy settings" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <UserSettings />
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <GreenhouseSettingsComponent />
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
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
 