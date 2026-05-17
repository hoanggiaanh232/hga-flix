export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

export const getYearFromDate = (dateString: string): number => {
  try {
    return new Date(dateString).getFullYear();
  } catch (error) {
    return new Date().getFullYear();
  }
};
