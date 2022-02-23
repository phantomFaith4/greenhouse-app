import React from 'react'
import './login.css';
import { useState } from 'react';
import axios from 'axios';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState([]);
  
  const handleSubmit = async e =>{
    e.preventDefault();
    const response = await axios.post(  
      '/api/auth/login' 
      ,{
        username,
        password,
      } 
    );   
   //localStorage.setItem("user",user); 
   console.log("UserInfo=>",response.data);
  };
  return (
    <div className='login'> 
        <div className='loginFormDiv'>
            <span className='formTitle'>Login to Smart Greenhouse</span>
            <form onSubmit={handleSubmit} className='loginForm'>
                <input onChange={({ target }) => setUsername(target.value)} className='inputEmail' type='text' placeholder='Email' />
                <input onChange={({ target }) => setPassword(target.value)} className='inputPassword' type='password' placeholder='Password' />
                <button className="loginButton" type="submit">Login</button>
                <span className='registerLink'>Dont have account? REGISTER</span>
            </form>
        </div>
    </div>
  ) 
}
