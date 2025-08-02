// src/components/NewsCard.jsx

import React from 'react';

// onClick prop을 추가
const NewsCard = ({ newsItem, onClick }) => {
  return (
    // div에 onClick 이벤트 핸들러 추가
    <div className="news-card" onClick={onClick}>
      <h2>{newsItem.title}</h2>
      <p>{newsItem.content}</p>
      <span className="meta">{newsItem.source} | {newsItem.published_date}</span>
    </div>
  );
};

export default NewsCard;