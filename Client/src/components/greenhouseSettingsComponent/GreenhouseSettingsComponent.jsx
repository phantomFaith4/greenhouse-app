import React from 'react'
import './greenhouseSettingsComponent.css';
import {useState, useEffect } from 'react';
import axios from 'axios';


export default function GreenhouseSettingsComponent() {
    const [greenhouse, setGreenhouse] = useState([]);
    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const res = await axios.get(`/api/greenhouse/all`);
                console.log("Greenhouse all=>",res.data);
                setGreenhouse(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch(); 
    },[]);

  return ( 
    <div className='greenhouseSettings'>
        <div className="greenhouseContainer">
            <table class="tg">
                <thead>
                <tr>
                    <th className="tg-0lax" colspan="5">Greenhouse List</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="tg-0lax">Name</td>
                    <td className="tg-0lax">Content</td>
                    <td className="tg-0lax">Description</td>
                    <td className="tg-0lax">Size</td>
                    <td className="tg-0lax"></td>
                </tr>
                {
                greenhouse.map(g => 
                        (
                        /*<li>{g.name}</li>*/
                        <tr>
                            <td className="tg-0lax">{g.name}</td>
                            <td className="tg-0lax">{g.content}</td> 
                            <td className="tg-0lax">{g.description}</td>
                            <td className="tg-0lax">{g.size}</td>
                            <td className="tg-0lax">
                                <i className="deleteIcon fa-solid fa-trash-can"></i>
                            </td>
                        </tr>
                        )
                    )
                } 
                </tbody>
            </table>
        </div>
        <i class="fa-solid fa-circle-plus"></i>
    </div>
  )
}
