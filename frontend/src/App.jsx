import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Marketplace from './Marketplace'
import AxieDetails from './AxieDetails'
import { ethPrice } from './context/ethPriceContext'
import call from './api/coingeckoApi'

function App() {
  const { eth, setEth } = useContext(ethPrice)
  
  useEffect(() => {
    let apiCall = async function () {
      let result = await call()
      console.log(result);
      return setEth(result)
    }
    apiCall()
  }, [])

  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Marketplace />} />
      <Route path="/axie/:id" element={<AxieDetails />} />
      </Routes>
    </div>
  )
}

export default App
