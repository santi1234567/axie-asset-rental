import React, { useEffect, useContext } from 'react'
import './App.css'
import Header from './includes/Header'
import Footer from './includes/Footer'
import Marketplace from './Marketplace'
import {ethPrice} from './context/ethPriceContext'
import call from './api/coingeckoApi'

function App() {
  const { eth, setEth } = useContext(ethPrice)
  useEffect(() => {
    let apiCall = async function() {
      let result = await call()
      console.log(result);
      return setEth(result)
    }
    apiCall()
  }, [])
  
  return (
    <div className="App">
      <Header />
      <Marketplace />
      <Footer />
    </div>
  )
}

export default App
