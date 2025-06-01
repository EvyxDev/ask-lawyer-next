import { useCallback } from 'react';

interface FormatDateOptions {
  day?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
}

const useFormatDate = () => {
  const formatDate = useCallback((dateString: string, locale: string, options: FormatDateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      const formatter = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', options);
      return formatter.format(date).replace(/\//g, ' / ');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; 
    }
  }, []);

  return formatDate;
};

export default useFormatDate;