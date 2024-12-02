import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatTimeAgo = (dateString: string): string => {
  try {
    return formatDistanceToNow(parseISO(dateString), { 
      addSuffix: true,
      locale: fr 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'récemment';
  }
};

export const cleanHtmlContent = (html: string): string => {
  return html.split('This article was written by')[0].trim();
};