import React, { useState, useEffect, useContext } from 'react'
import Axie from './includes/Axie'
import db from './assets/database/database.json'
import './marketplace.css'
import { ethPrice } from './context/ethPriceContext'
import Header from "./includes/Header";
import Footer from "./includes/Footer";


export default function Marketplace() {
    const [dataBase, setDataBase] = useState([])
    const { eth, setEth } = useContext(ethPrice)
    console.log(eth);

    useEffect(() => {
        setDataBase(db)
    }, [])

    console.log(eth);

    return (
        <div>
            <Header />
            <div className='marketplace'>
                <br />
                <h2>Axies for Rental</h2>
                <div className='axies'>
                    {
                        dataBase && dataBase.map((axie, i) =>
                            <Axie key={i} data={axie} />)
                    }
                </div>
                <br />
            </div>
            <Footer />
        </div>
    )
}
