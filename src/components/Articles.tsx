import React, { useState } from 'react';
import NewsItem from './NewsItem';
import type { NewsArticleResponse } from '../types/newsArticle';
import { truncateByWords } from '../utils/text';
import { formatToLocalTimeFromGMT, formatToLocalAmPm } from '../utils/date';
import { removeHtmlTag } from '../utils/removeHtmlTags';
import './Articles.css';

const Articles: React.FC<NewsArticleResponse> = ({ articles, source }) => {
  const [expanded, setExpanded] = useState(false);
  const itemsToShow = expanded ? articles : articles.slice(0, 3);

  return (
    <div className={`articles-section-${source}`}>
      <div className={`articles-header-${source}`}>{source === "FMP" ? "Latest Market Headlines" : "Latest News"}</div>
      {itemsToShow.map((article, idx) => (
        <NewsItem
          key={idx}
          title={article.title}
          content={truncateByWords(removeHtmlTag(article.content), 120) + "..."}
          link={article.link}
          date={source === "FMP" ? formatToLocalTimeFromGMT(article.date) : formatToLocalAmPm(article.date)}
          image={article.image}
        />
      ))}

      {articles.length > 5 && (
        <div
          className={`expand-arrow ${expanded ? "expanded" : ""}`}
          onClick={() => setExpanded(!expanded)}
        />
      )}
    </div>
  );
};

export default Articles;
