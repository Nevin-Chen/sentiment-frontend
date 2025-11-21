import React, { useEffect, useState } from "react";
import { Search, Articles } from ".";
import type { NewsArticleResponse } from "../types/newsArticle";
import { API_URL } from "../config/api";
import { api } from "../lib/axios";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [newsResponse, setNewsResponse] = useState<NewsArticleResponse | null>(null);

  const getHeadlineArticles = async () => {
    const url = `${API_URL}/stocks/news`;
    const { data } = await api.get(url);

    setNewsResponse(data);
  };

  useEffect(() => {
    getHeadlineArticles();
  }, []);

  if (!newsResponse) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <div className="hero-container">
        <div className="hero-title">
          Learn the Market with Sentiment <span className="brand">AI</span>
        </div>

        <div className="hero-subtitle">
          Search a stock and Sentibot will guide you through the <br />
          charts, trends, and technicals
        </div>
      </div>
      <Search variant="home" />
      <Articles articles={newsResponse.articles} source={newsResponse.source} />
    </div>
  );
};

export default HomePage;
