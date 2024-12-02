import { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types/news';
import { fetchRSSFeed } from '../utils/api';
import { REFRESH_INTERVAL, NEWS_LIMIT } from '../utils/constants';

export function useFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchRSSFeed();
      setNews(data.slice(0, NEWS_LIMIT));
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch news feed. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return { news, loading, error, lastUpdated, refetch: fetchNews };
}