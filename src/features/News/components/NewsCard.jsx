// src/components/NewsCard.jsx

import React from 'react';

// onClick prop을 제거
const NewsCard = ({ newsItem }) => {
  return (
    // a 태그로 카드를 감싸서 바로 링크로 이동
    <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="news-card-link">
      <div className="news-card">
        <h2>{newsItem.title}</h2>
        <p>{newsItem.content}</p>
        <span className="meta">{newsItem.source} | {newsItem.published_date}</span>
      </div>
    </a>
  );
};

export default NewsCard;