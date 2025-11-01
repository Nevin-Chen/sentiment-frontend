import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Chart, ChatWrapper, Articles, Profile, Tooltip } from '.';
import type { CompanyProfile } from '../types/fmp';
import type { OHLC, OHLCResponse } from '../types/ohlc';
import type { NewsArticleResponse } from '../types/newsArticle';
import './StockPage.css'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const StockPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const [olhcData, setOlhcData] = useState<OHLC[] | null>(null)
  const [source, setSource] = useState<'FMP' | 'Massive' | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [newsResponse, setNewsResponse] = useState<NewsArticleResponse | null>(null)

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

  const getCompanyProfile = async () => {
    try {
      const url = `${API_URL}/api/stocks/${symbol}/profile`
      const { data } = await axios.get<CompanyProfile>(url)
      setCompanyProfile(data)
    } catch (err) {
      console.error('Failed to fetch company profile', err)
    }
  }

  const getStockNews = async () => {
    try {
      const url = `${API_URL}/api/stocks/${symbol}/news`
      const { data } = await axios.get<NewsArticleResponse>(url)

      setNewsResponse(data)
    } catch (err) {
      console.error(`Failed to fetch ${symbol} news`, err)
    }
  }

  useEffect(() => {
    getStockData()
    getCompanyProfile()
    getStockNews()
  }, [symbol])

  if (!symbol) return <p>Loading...</p>

  return (
    <>
      <div className="title-container">
        <div className="company-name">
          {companyProfile?.companyName}
        </div>

        <div className="company-symbol">
          <a href={companyProfile?.website}>({companyProfile?.symbol})</a>
        </div>
        {source === "Massive" && <Tooltip text="Chart data may be delayed by up to 1 day" />}
      </div>

      <div className="inner-row">
        <div className="left-column">
          {olhcData && <Chart olhcData={olhcData} />}
          {newsResponse && <Articles articles={newsResponse.articles} source={newsResponse.source} />}
        </div>

        <div className="right-column">
          <ChatWrapper symbol={symbol} />
        </div>
      </div>

      <div>
        {companyProfile && <Profile companyProfile={companyProfile} />}
      </div>
    </>
  )
}

export default StockPage
