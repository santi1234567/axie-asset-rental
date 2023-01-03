import React from 'react'

export default function Axie({ data }) {
    return (
        <div className='axie'>
            <img src={`images/${data.image}.png`} alt="" />
            <h3>
                Id: {data.id}
            </h3>
            <h3>
                price: {data.id}
            </h3>
        </div>
    )
}
