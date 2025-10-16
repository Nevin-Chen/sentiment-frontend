import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import type { PolygonResponse } from './types/Polygon';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [tickerAggs, setTickerAggs] = useState<PolygonResponse | null>(null)

  const getStockData = async () => {
    try {
      const url = `${API_URL}/api/stocks/AAPL/aggs?from=2025-10-13&to=2025-10-14`
      const { data } = await axios.get<PolygonResponse>(url)

      setTickerAggs(data)
    } catch (err) {
      console.error('failed to fetch stock data', err)
    }
  }

  useEffect(() => {
    getStockData()
  }, [])

  return (
    <>
      <div>
        {tickerAggs ? (
          <div>{JSON.stringify(tickerAggs)}</div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default App
