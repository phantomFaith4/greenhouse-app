import './login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {useNavigate } from 'react-router-dom';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [user,setUser] = useState([]);  
  const navigate = useNavigate(); 
  useEffect(()=>{
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if(userStorage!= null){
      setUser(JSON.parse(localStorage.getItem('user')));
      navigate('/home');
    }
  },[]);
  const handleSubmit = async e =>{
    e.preventDefault();
    if(username.length > 0 && password.length > 0){

      const response = await axios.post(  
        '/api/auth/login' 
        ,{ 
          username, 
          password,
        } 
        ).catch(function (err) {
          setErrorMessage("Username or password are wrong!!!");
          console.log(err);
          setTimeout(()=> {
            setErrorMessage()
          }, 2000);
        }) 
        localStorage.setItem('user',JSON.stringify(response.data));
        setUser(response.data);
        navigate('/home');
      }else{
        setErrorMessage("You need to enter username and password !!!");
        setTimeout(()=> {
          setErrorMessage()
        }, 2000);
      }
    };
  return (
    <div className='login'> 
        <div className='loginFormDiv'>
            <span className='formTitle'>Login to Smart Greenhouse</span>
            <form onSubmit={handleSubmit } className='loginForm'>
                <input onChange={({ target }) => setUsername(target.value)} className='inputEmail' type='text' placeholder='Email' />
                <input onChange={({ target }) => setPassword(target.value)} className='inputPassword' type='password' placeholder='Password' />
                <button className="loginButton" type="submit">Login</button>
            </form>
            {errorMessage && <Alert variant="filled" severity="error">{errorMessage}</Alert>  }
        </div>
    </div>
  ) 
}
