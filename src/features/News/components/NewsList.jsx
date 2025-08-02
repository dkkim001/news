// src/components/NewsList.jsx

import React, { useState } from 'react';
import NewsCard from './NewsCard';
import { useFetchNews } from '../hooks/useFetchNews';
import '../News.css';
import './Category.css';

// 카테고리 목록 정의 (시트 이름과 일치해야 함)
const categories = [
  { name: 'HR뉴스', sheetName: 'HR' },
  { name: 'AI뉴스', sheetName: 'AI' },
  // { name: '개발', sheetName: '개발' },
];

const NewsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].sheetName);
  const { data, loading, error } = useFetchNews(selectedCategory);

  return (
    <div>
      {/* 카테고리 버튼들 */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category.sheetName}
            className={`category-button ${selectedCategory === category.sheetName ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.sheetName)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      {loading ? (
        <div className="loading">뉴스를 불러오는 중입니다...</div>
      ) : error ? (
        <div className="error">오류가 발생했습니다: {error}</div>
      ) : !data || data.length === 0 ? (
        <div className="no-data">불러올 기사가 없습니다.</div>
      ) : (
        <div className="news-container">
          {data.map((item) => (
            <NewsCard 
              key={item.link} 
              newsItem={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;