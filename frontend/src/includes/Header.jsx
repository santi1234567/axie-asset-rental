import React from 'react'
import logo from "../assets/marketplace.png";
import './header.css'

export default function header() {
    return (
        <div className='header'>
            <img src={logo} alt="" className='logo' />
            <span>Axie Lending</span>
            <button>connect wallet</button>
        </div>
    )
}
