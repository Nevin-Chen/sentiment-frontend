import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import type { PolygonResponse } from './types/Polygon';
import Chart from './components/Chart';
import Chat from './components/Chat'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [tickerAggs, setTickerAggs] = useState<PolygonResponse | null>(null)

  const getStockData = async () => {
    try {
      const url = `${API_URL}/api/stocks/AAPL/aggs`
      const { data } = await axios.get<PolygonResponse>(url)

      setTickerAggs(data)
    } catch (err) {
      console.error('failed to fetch stock data', err)
    }
  }

  useEffect(() => {
    getStockData()
  }, [])

  if (!tickerAggs) return <p>Loading...</p>;

  return (
    <>
      <h3>{tickerAggs.ticker}</h3>
      <div className="main-layout">
        <Chart results={tickerAggs.results} />
        <Chat ticker={tickerAggs.ticker} />
      </div>
    </>
  )
}

export default App
