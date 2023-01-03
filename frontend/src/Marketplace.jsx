import React, { useState, useEffect, useContext } from 'react'
import Axie from './includes/Axie'
import db from './assets/database/database.json'
import './marketplace.css'
import {ethPrice} from './context/ethPriceContext'

export default function Marketplace() {
    const [dataBase, setDataBase] = useState([])
    const {eth, setEth} = useContext(ethPrice)
    console.log(dataBase);
    useEffect(() => {
        setEth(1)
        setDataBase(db), []
    }
    )
    return (
        <div className='marketplace'>
            <br />
            <h2>Axies for Rental</h2>
            <div className='axies'>
                {
                    dataBase && dataBase.map(axie =>
                       <Axie data={axie}/> )
                }
            </div>
            <br />
        </div>
    )
}
