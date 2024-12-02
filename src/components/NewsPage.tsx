import React, { useState, useCallback } from 'react';
import { NewsItem } from './NewsItem';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { SentimentAnalysis } from './SentimentAnalysis';
import { useFeed } from '../hooks/useFeed';
import { useSettings } from '../hooks/useSettings';
import { SentimentAnalysis as SentimentType } from '../types/news';
import { analyzeSentiment } from '../utils/api';
import { RefreshCw, Scan, AlertCircle } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { news, loading, error, lastUpdated, refetch } = useFeed();
  const { settings } = useSettings();
  const [sentiment, setSentiment] = useState<SentimentType | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleScanSentiment = useCallback(async () => {
    if (analyzing || !news.length || !settings.apiKey) return;

    try {
      setAnalyzing(true);
      const combinedText = news.slice(0, 10).map(item => 
        `${item.title}\n${item.description}`
      ).join('\n\n');
      
      const analysis = await analyzeSentiment(combinedText, settings);
      setSentiment(analysis);
    } catch (err) {
      console.error('Failed to analyze sentiment:', err);
    } finally {
      setAnalyzing(false);
    }
  }, [news, analyzing, settings]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Actualités Forex</h1>
          {lastUpdated && (
            <p className="text-sm text-slate-500 mt-1">
              Dernière mise à jour : {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={refetch}
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={20} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
          <button
            onClick={handleScanSentiment}
            disabled={analyzing || loading || !news.length || !settings.apiKey}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm"
            title={!settings.apiKey ? 'Veuillez configurer votre clé API dans les paramètres' : undefined}
          >
            <Scan size={20} className="mr-2" />
            Analyser
          </button>
        </div>
      </div>

      {!settings.apiKey && (
        <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertCircle className="text-amber-500 mr-2" size={20} />
            <p className="text-amber-700">
              Pour utiliser l'analyse des sentiments, veuillez configurer votre clé API OpenAI dans les{' '}
              <a href="/settings" className="underline hover:text-amber-800">paramètres</a>.
            </p>
          </div>
        </div>
      )}

      <SentimentAnalysis sentiment={sentiment} loading={analyzing} />

      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          {news.map(item => (
            <NewsItem key={`${item.guid}-${item.pubDate}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};