// src/components/NewsList.jsx

import React, { useState } from 'react';
import NewsCard from './NewsCard';
import { useFetchNews } from '../hooks/useFetchNews'; // useFetchNews 훅 수정
import Modal from './Modal';
import '../News.css';
import './Category.css'; // 새로운 CSS 파일 불러오기

// 카테고리 목록 정의 (시트 이름과 일치해야 함)
const categories = [
  { name: 'HR', sheetName: 'HR_뉴스' },
  { name: 'AI', sheetName: 'AI_뉴스' },
  { name: '개발', sheetName: '개발_뉴스' },
];

const NewsList = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].sheetName);
  const { data, loading, error } = useFetchNews(selectedCategory);

  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const handleCardClick = (link) => {
    setSelectedLink(link);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLink('');
  };

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
              onClick={() => handleCardClick(item.link)}
            />
          ))}
        </div>
      )}

      <Modal show={showModal} onClose={handleCloseModal} link={selectedLink} />
    </div>
  );
};

export default NewsList;