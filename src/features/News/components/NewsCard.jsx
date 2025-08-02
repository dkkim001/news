// 수정된 NewsCard.jsx
import React from 'react';

const NewsCard = ({ newsItem }) => {
  return (
    <div className="news-card">
      <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
        <h2>{newsItem.title}</h2>
        <p>{newsItem.content}</p>
        <span className="meta">{newsItem.source} | {newsItem.published_date}</span>
      </a>
    </div>
  );
};

export default NewsCard;