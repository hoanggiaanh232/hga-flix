export const getImageUrl = (url: string): string => {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `https://ophim1.com${url}`;
};

export const getOptimizedImageUrl = (url: string, width?: number): string => {
  const imageUrl = getImageUrl(url);
  // For Next.js Image component, we don't need to modify the URL
  // The Next.js Image component handles optimization
  return imageUrl;
};
