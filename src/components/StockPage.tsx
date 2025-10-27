import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Chart, Chat, Profile, Tooltip } from '.';
import type { CompanyProfile } from '../types/fmp';
import type { OHLC, OHLCResponse } from '../types/ohlc';
import './StockPage.css'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const StockPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const [olhcData, setOlhcData] = useState<OHLC[] | null>(null)
  const [source, setSource] = useState<'FMP' | 'Polygon' | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)

  const getStockData = async () => {
    try {
      const url = `${API_URL}/api/stocks/${symbol}/ohlc`
      const response = await axios.get<OHLCResponse>(url)
      const { data, source } = response.data

      setSource(source)
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
  }, [symbol])

  useEffect(() => {
    if (olhcData && olhcData.length > 0) {
      getCompanyProfile(olhcData[0].symbol)
    }
  }, [olhcData])

  if (!olhcData) return <p>Loading...</p>

  return (
    <>
      <div className="title-container">
        <div className="company-name">
          {companyProfile?.companyName}
        </div>

        <div className="company-symbol">
          <a href={companyProfile?.website}>({companyProfile?.symbol})</a>
        </div>
        {source === "Polygon" && <Tooltip text="Chart data may be delayed by up to 1 day" />}
      </div>

      <div className="inner-row">
        <div className="left-column">
          <Chart olhcData={olhcData} />
          {companyProfile && <Profile companyProfile={companyProfile} />}
        </div>

        <div className="right-column">
          <Chat symbol={olhcData[0].symbol} />
        </div>
      </div>
    </>
  )
}

export default StockPage
