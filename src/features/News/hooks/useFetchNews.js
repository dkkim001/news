// src/hooks/useFetchNews.js

import { useState, useEffect } from 'react';
import { fetchNewsData } from '../services/NewsService';

// sheetName을 인자로 받도록 수정
export const useFetchNews = (sheetName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await fetchNewsData(sheetName);
        setData(news);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
    // sheetName이 변경될 때마다 훅이 재실행되도록 의존성 배열에 추가
  }, [sheetName]);

  return { data, loading, error };
};