// useFetchNews.js
import { useState, useEffect } from 'react';
import { fetchNewsData } from '../services/newsService';

export const useFetchNews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const news = await fetchNewsData();
        setData(news);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, loading, error };
};