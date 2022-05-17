import React from 'react';
import './topbar.css';
import {useState } from 'react';

export default function Topbar(props) {
  return ( 
        <div className='topbar'>
            <span >TEST TEST TEST</span> 
            <select name="greenhouse" onChange={(e)=>props.getData(e.target.value)} id="greenhouses">
                <option value="green1">Green 1</option>
                <option value="green2">Green 2</option>
                <option value="green3">Green 3</option>
                <option value="green4">Green 4</option>
            </select>
        </div>
    );
}
