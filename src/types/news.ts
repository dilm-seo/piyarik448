export interface NewsItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  creator: string;
  description: string;
  category: string;
}

export interface SentimentAnalysis {
  EUR_USD: number;
  GBP_USD: number;
  USD_JPY: number;
  USD_CHF: number;
  AUD_USD: number;
  USD_CAD: number;
  NZD_USD: number;
}