import React from 'react'
import {Link } from 'react-router-dom';
import './errorPage.css';

export default function ErrorPage() {
  
  return (
    <div className='errorPage'>
      <h1>ERROR 404</h1>
      <h2>Return to home page</h2>
      <div className='errorPageHomeButtonDiv'>
        <Link className='linkToHomePage' to="/home">HOME</Link>
      </div>
    </div>
  )
}
