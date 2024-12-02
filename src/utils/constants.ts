export const CURRENCY_PAIRS = {
  EUR_USD: 'EUR/USD',
  GBP_USD: 'GBP/USD',
  USD_JPY: 'USD/JPY',
  USD_CHF: 'USD/CHF',
  AUD_USD: 'AUD/USD',
  USD_CAD: 'USD/CAD',
  NZD_USD: 'NZD/USD'
} as const;

export const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes
export const NEWS_LIMIT = 10;
export const SENTIMENT_THRESHOLD = {
  POSITIVE: 0.3,
  NEGATIVE: -0.3
};
