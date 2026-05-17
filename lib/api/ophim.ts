import axios from 'axios';
import type {
  Movie,
  MovieDetail,
  HomeData,
  SearchResponse,
  ListResponse,
  CategoryListResponse,
  CountryListResponse,
  YearListResponse,
} from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_OPHIM_API_BASE_URL || 'https://ophim1.com/v1/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Add request timeout
apiClient.defaults.timeout = 10000;

// Home page data
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await apiClient.get('/home');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

// Get movie detail by slug
export const getMovieDetail = async (slug: string): Promise<MovieDetail> => {
  try {
    const response = await apiClient.get(`/phim/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching movie detail for ${slug}:`, error);
    throw error;
  }
};

// Search movies
export const searchMovies = async (keyword: string): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<SearchResponse>(`/tim-kiem?keyword=${keyword}`);
    return response.data.data?.items || [];
  } catch (error) {
    console.error(`Error searching movies with keyword "${keyword}":`, error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/the-loai');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get movies by category with pagination
export const getMoviesByCategory = async (
  slug: string,
  page: number = 1
): Promise<ListResponse> => {
  try {
    const response = await apiClient.get(`/the-loai/${slug}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies by category ${slug}:`, error);
    throw error;
  }
};

// Get all countries
export const getCountries = async () => {
  try {
    const response = await apiClient.get('/quoc-gia');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Get movies by country with pagination
export const getMoviesByCountry = async (
  slug: string,
  page: number = 1
): Promise<ListResponse> => {
  try {
    const response = await apiClient.get(`/quoc-gia/${slug}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies by country ${slug}:`, error);
    throw error;
  }
};

// Get all years
export const getYears = async () => {
  try {
    const response = await apiClient.get('/nam-phat-hanh');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching years:', error);
    throw error;
  }
};

// Get movies by year with pagination
export const getMoviesByYear = async (
  year: number,
  page: number = 1
): Promise<ListResponse> => {
  try {
    const response = await apiClient.get(`/nam-phat-hanh/${year}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies by year ${year}:`, error);
    throw error;
  }
};

// Get movie images
export const getMovieImages = async (slug: string) => {
  try {
    const response = await apiClient.get(`/phim/${slug}/images`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching images for ${slug}:`, error);
    return [];
  }
};

// Get movie cast and crew
export const getMoviePeoples = async (slug: string) => {
  try {
    const response = await apiClient.get(`/phim/${slug}/peoples`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching peoples for ${slug}:`, error);
    return [];
  }
};

// Get movie keywords
export const getMovieKeywords = async (slug: string) => {
  try {
    const response = await apiClient.get(`/phim/${slug}/keywords`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching keywords for ${slug}:`, error);
    return [];
  }
};

// Generic list with filters
export const getMoviesList = async (
  category?: string,
  country?: string,
  year?: number,
  page: number = 1
): Promise<ListResponse> => {
  try {
    let url = '/danh-sach/phim-moi';
    const params: string[] = [];

    if (category) params.push(`category=${category}`);
    if (country) params.push(`country=${country}`);
    if (year) params.push(`year=${year}`);
    params.push(`page=${page}`);

    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    const response = await apiClient.get(`${url}${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies list:', error);
    throw error;
  }
};
