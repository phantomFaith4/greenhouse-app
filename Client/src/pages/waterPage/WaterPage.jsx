import React from 'react'
import './waterPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../../components/topbarComponent/Topbar';
import Sidebar from '../../components/sidebarComponent/Sidebar';

export default function WaterPage() {

    useEffect(()=>{

    },[]);
  return (
    <div className='waterPage'>
        <Topbar /> 
        <Sidebar />
        <div className="waterPageContaier">
            <h1>Water page</h1> 
        </div>
    </div>
  )
}
