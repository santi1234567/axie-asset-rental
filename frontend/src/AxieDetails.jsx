import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link , Navigate , useNavigate} from "react-router-dom";
import { ethPrice } from './context/ethPriceContext'

import findAxie from './functions/findAxie'
import Header from "./includes/Header";
import Footer from "./includes/Footer";


export default function AxieDetails() {
  const [axieData, setAxieData] = useState({})
  const { eth, setEth } = useContext(ethPrice)
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    let searchAxie = async () => {
      let data = await findAxie(id)
      console.log(data);
        if (data == undefined) return navigate('/')
      return setAxieData(data)
    }
    searchAxie()
  }, [])

  console.log(axieData);

  return (
    <div >
      <Header />
      <Link to={'/'}>
        <h5>back to marketplace</h5>
      </Link>
      <img src={`/images/${axieData.image}.png`} alt="" />
      <h3>
        Id: {axieData.id}
      </h3>
      <h3>price: {axieData.price} </h3>
      <h3>
        u$d: {axieData.price * eth}
      </h3>

      <Footer />
    </div>

  )
}
