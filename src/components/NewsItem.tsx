import React, { memo } from 'react';
import { NewsItem as NewsItemType } from '../types/news';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { formatTimeAgo, cleanHtmlContent } from '../utils/formatters';

interface Props {
  item: NewsItemType;
}

export const NewsItem: React.FC<Props> = memo(({ item }) => {
  const timeAgo = formatTimeAgo(item.pubDate);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-2 flex-grow">{item.title}</h2>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 flex-shrink-0 p-1 hover:bg-blue-50 rounded-full transition-colors"
          title="Ouvrir dans un nouvel onglet"
        >
          <ExternalLink size={20} />
        </a>
      </div>
      <div className="flex items-center text-sm text-slate-500 mb-4 gap-4">
        <span className="flex items-center gap-1">
          <User size={14} />
          <span className="font-medium">{item.creator}</span>
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          <time dateTime={item.pubDate} title={new Date(item.pubDate).toLocaleString()}>
            {timeAgo}
          </time>
        </span>
      </div>
      <div
        className="text-slate-600 prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{
          __html: cleanHtmlContent(item.description),
        }}
      />
    </article>
  );
});