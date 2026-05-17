import clsx from 'clsx';

export const cn = (...classes: any[]): string => {
  return clsx(classes);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder.png';
  if (url.startsWith('http')) return url;
  return `https://ophim1.com${url}`;
};

export const getYearFromString = (year: any): number => {
  if (typeof year === 'number') return year;
  if (typeof year === 'string') {
    const match = year.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : new Date().getFullYear();
  }
  return new Date().getFullYear();
};
