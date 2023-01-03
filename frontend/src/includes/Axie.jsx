import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function Axie({ data }) {
    return (
        <Link className='axie' to={`/axie/${data.id}`}>
            <div >
                <img src={`images/${data.image}.png`} alt="" />
                <h3>
                    Id: {data.id}
                </h3>
                <h3>
                    price: {data.id}
                </h3>
            </div>
        </Link>
    )
}
