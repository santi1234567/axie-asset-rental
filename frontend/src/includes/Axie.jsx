import React, {useContext} from 'react'
import { ethPrice } from '../context/ethPriceContext'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './axie.css'

export default function Axie({ data }) {
    const { eth, setEth } = useContext(ethPrice)

    return (
        <Link className='axie' to={`/axie/${data.id}`}>
            <div >
                <img src={`images/${data.image}.png`} alt="" />
                <div className='axieInfo'>
                    <h4>Axie ID: #{data.id}</h4>
                    <span>
                        <h3 className='eth'>
                            price: E{data.price}
                        </h3>
                    </span>
                    <span>
                        <h3 className='usd'>
                            price: ${data.price*eth}
                        </h3>
                    </span>
                </div>
            </div>
        </Link>
    )
}
