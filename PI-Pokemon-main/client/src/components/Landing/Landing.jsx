import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div >
      <div >
      <h1>Welcome to the PokeApp landing page!</h1>
        <Link exact to='/home' >Enter</Link>      
      </div>
    </div>
  );
}

export default Landing;