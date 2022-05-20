import React from 'react';
import './topbar.css';
import {useState, useEffect } from 'react';
import axios from 'axios';

export default function Topbar(props) {
    const [greenhouse,setGreenhouse] = useState([]);
    
    useEffect(()=>{
        const fetch = async ()=>{
            const res = await axios.get('/api/greenhouse/all');
            console.log("Topbar=>",res);
            setGreenhouse(res.data);
        };
        fetch();
    },[]);
    return ( 
        <div className='topbar'> 
            <select name="greenhouse" onChange={(e)=>props.getData(e.target.value)} id="greenhouses">
                {greenhouse.map(g => (
                     <option value={g.name}>{g.name}</option>
                ))}  
            </select>
        </div>
    );
}
