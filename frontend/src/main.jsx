import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import EthPrice from './context/ethPriceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EthPrice>
        <App />
      </EthPrice>
    </BrowserRouter>
  </React.StrictMode>
)
