import React, { memo } from 'react';
import { SentimentAnalysis as SentimentType } from '../types/news';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { CURRENCY_PAIRS, SENTIMENT_THRESHOLD } from '../utils/constants';

interface Props {
  sentiment: SentimentType | null;
  loading: boolean;
}

export const SentimentAnalysis: React.FC<Props> = memo(({ sentiment, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-6 w-48 bg-slate-200 rounded mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-20 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sentiment) return null;

  const getSentimentIcon = (value: number) => {
    if (value > SENTIMENT_THRESHOLD.POSITIVE) return <TrendingUp size={16} />;
    if (value < SENTIMENT_THRESHOLD.NEGATIVE) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  const getSentimentColor = (value: number) => {
    if (value > SENTIMENT_THRESHOLD.POSITIVE) return 'text-emerald-600';
    if (value < SENTIMENT_THRESHOLD.NEGATIVE) return 'text-red-600';
    return 'text-amber-600';
  };

  const pairs = Object.entries(sentiment);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">
        Analyse des Sentiments par Paire de Devises
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pairs.map(([pair, value]) => (
          <div key={pair} className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-slate-700">
                {CURRENCY_PAIRS[pair as keyof typeof CURRENCY_PAIRS]}
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </div>
            <div className={`flex items-center ${getSentimentColor(value)}`}>
              {getSentimentIcon(value)}
              <span className="ml-1 font-medium">{(value * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});