import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';


export default function Home(){
    return (
      <div className='home-page'>
          <h1>Welcome to the PokeApp!</h1>
          <Link to='/pokemon'>
            <button id='home-button'>Start</button>
          </Link>
      </div>
    )
  }