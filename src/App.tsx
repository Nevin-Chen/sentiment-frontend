import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import type { OHLC, CompanyProfile, OHLCResponse } from './types/fmp';
import Chart from './components/Chart';
import Chat from './components/Chat'
import Profile from './components/Profile'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [olhcData, setOlhcData] = useState<OHLC[] | null>(null)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)

  const getStockData = async () => {
    try {
      const url = `${API_URL}/api/stocks/AAPL/historical`
      const { data } = await axios.get<OHLCResponse>(url)

      setOlhcData(data)
    } catch (err) {
      console.error('failed to fetch stock data', err)
    }
  }

  const getCompanyProfile = async (ticker: string) => {
    try {
      const url = `${API_URL}/api/stocks/${ticker}/profile`
      const { data } = await axios.get<CompanyProfile>(url)
      setCompanyProfile(data)
    } catch (err) {
      console.error('Failed to fetch company profile', err)
      setCompanyProfile(null)
    }
  }

  useEffect(() => {
    getStockData()
  }, [])

  useEffect(() => {
    if (olhcData && olhcData.length > 0) {
      getCompanyProfile(olhcData[0].symbol)
    }
  }, [olhcData])

  if (!olhcData) return <p>Loading...</p>

  return (
    <>
      <Header />
        <div className="inner-container">
          <div className="main-layout">
            <div className="left-column">
              <div className="ticker-container">
                <div className="ticker-name">
                  {companyProfile?.companyName}
                </div>
                <div className="ticker-symbol">
                  <a href={companyProfile?.website}>({companyProfile?.symbol})</a>
                </div>
              </div>
              <Chart olhcData={olhcData} />
              {companyProfile && <Profile companyProfile={companyProfile} />}
            </div>

            <div className="right-column">
              <Chat symbol={olhcData[0].symbol} />
            </div>
          </div>
      </div>
    </>
  )
}

export default App
