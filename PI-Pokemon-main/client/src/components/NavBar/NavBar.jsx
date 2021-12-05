import React from "react";
import {NavLink} from 'react-router-dom';
import './NavBar.module.css';
import Logo from '../NavBar/logoHenry.png'

export default function NavBar(){
    return (
        <header className='navBar'>
        <div>
                <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </div>
            <nav>
            <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}