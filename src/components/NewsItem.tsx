import React from 'react';
import './NewsItem.css';

interface NewsItemProps {
  title: string;
  link: string;
  date: string;
  content: string;
  image?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, link, date, image, content }) => {
  return (
    <div className="news-item">
      <div className="news-item-image-container">
        {image && <img src={image} alt={title} className="news-item-image" />}
      </div>

      <div className="news-item-content">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="news-title">
            {title}
          </div>
        </a>

        <div className="news-preview">
          {content}
        </div>
      </div>

      <div className="news-item-meta">
        {date}
      </div>
    </div>
  );
};

export default NewsItem;
