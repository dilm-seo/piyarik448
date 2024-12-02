import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { NewsItem, RSSFeed, SentimentAnalysis } from '../types/news';
import { Settings } from '../types/settings';
import he from 'he';
import OpenAI from 'openai';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_URL = 'https://www.forexlive.com/feed/news/';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "_",
});

export async function fetchRSSFeed(): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    const parsed = parser.parse(response.data) as RSSFeed;
    
    return parsed.rss.channel.item.map(item => ({
      ...item,
      title: he.decode(item.title),
      description: he.decode(item.description),
    }));
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}

export async function analyzeSentiment(text: string, settings: Settings): Promise<SentimentAnalysis> {
  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true
  });

  const prompt = `Analyze the following forex news for sentiment regarding major currency pairs. 
  Rate the sentiment for each pair on a scale from -1 (very bearish) to 1 (very bullish).
  
  News text:
  ${text}
  
  Please provide sentiment ratings in the following JSON format:
  {
    "EUR_USD": number,
    "GBP_USD": number,
    "USD_JPY": number,
    "USD_CHF": number,
    "AUD_USD": number,
    "USD_CAD": number,
    "NZD_USD": number
  }`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: settings.model,
      temperature: settings.temperature,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response) as SentimentAnalysis;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
}