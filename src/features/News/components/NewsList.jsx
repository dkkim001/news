// src/components/NewsList.jsx

import React, { useState } from 'react';
import NewsCard from './NewsCard';
import { useFetchNews } from '../hooks/useFetchNews';
import Modal from './Modal'; // Modal 컴포넌트 불러오기
import '../News.css';

const NewsList = () => {
  const { data, loading, error } = useFetchNews();
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
      {data.map((item) => (
        <NewsCard 
          key={item.link} 
          newsItem={item} 
          onClick={() => handleCardClick(item.link)}
        />
      ))}
      <Modal show={showModal} onClose={handleCloseModal} link={selectedLink} />
    </div>
  );
};

export default NewsList;