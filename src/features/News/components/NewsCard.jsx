// NewsCard.jsx
import React from 'react';

const NewsCard = ({ newsItem }) => {
  return (
    <div className="news-card">
      <a href={newsItem.링크} target="_blank" rel="noopener noreferrer">
        <h2>{newsItem.제목}</h2>
        <p>{newsItem.내용}</p>
        <span className="meta">{newsItem.출처} | {newsItem['추출 일시']}</span>
      </a>
    </div>
  );
};

export default NewsCard;