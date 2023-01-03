import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import EthPrice from './context/ethPriceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EthPrice>
      <App />
    </EthPrice>
  </React.StrictMode>
)
