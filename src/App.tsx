import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import type { CompanyProfile } from './types/fmp';
import type { OHLC, OHLCResponse } from './types/ohlc';
import Chart from './components/Chart';
import Chat from './components/Chat'
import Profile from './components/Profile'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [olhcData, setOlhcData] = useState<OHLC[] | null>(null)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)

  const getStockData = async () => {
    try {
      const url = `${API_URL}/api/stocks/AAPL/ohlc`
      const response = await axios.get<OHLCResponse>(url)
      const { data } = response.data

      setOlhcData(data)
    } catch (err) {
      console.error('failed to fetch stock data', err)
    }
  }

  const getCompanyProfile = async (symbol: string) => {
    try {
      const url = `${API_URL}/api/stocks/${symbol}/profile`
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
              <div className="company-name-container">
                <div className="company-name">
                  {companyProfile?.companyName}
                </div>
                <div className="company-symbol">
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
