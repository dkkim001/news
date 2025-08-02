// NewsList.jsx
import React from 'react';
import NewsCard from './NewsCard';
import { useFetchNews } from '../hooks/useFetchNews';
import '../News.css'; // 공통 스타일 파일 불러오기

const NewsList = () => {
  const { data, loading, error } = useFetchNews();

  if (loading) {
    return <div className="loading">뉴스를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="error">오류가 발생했습니다: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="no-data">불러올 기사가 없습니다.</div>;
  }

  return (
    <div className="news-container">
      {data.map((item, index) => (
        <NewsCard key={index} newsItem={item} />
      ))}
    </div>
  );
};

export default NewsList;