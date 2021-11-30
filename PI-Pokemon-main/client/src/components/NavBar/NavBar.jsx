import React from "react";
import {NavLink} from 'react-router-dom';
import './NavBar.css';
import Logo from '../../logoHenry.png';

export default function NavBar(){
    return (
        <header className='navBar'>
            <div id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
            <nav>

            </nav>
        </header>
    )
}