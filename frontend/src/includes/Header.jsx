import React from 'react'
import logo from "../assets/marketplace.png";
import './header.css'
import { Link } from "react-router-dom";


export default function header() {
    return (
        <div className='header'>
            <Link to={'/'}>
                <img src={logo} alt="" className='logo' />
            </Link>
            <span>Axie Lending</span>
            <button>connect wallet</button>
        </div>
    )
}
