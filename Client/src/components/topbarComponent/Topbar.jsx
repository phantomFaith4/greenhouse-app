import React from 'react';
import './topbar.css';
import {useState } from 'react';

export default function Topbar() {
  return ( 
        <div className='topbar'>
            <span>TEST TEST TEST</span> 
            <select name="greenhouse" id="greenhouses">
                <option value="none">NONE</option>
                <option value="greenhouse1">Paprika</option>
                <option value="greenhouse1">Paprika</option>
                <option value="greenhouse1">Paprika</option>
            </select>
        </div>
    );
}
