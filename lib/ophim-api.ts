import axios, { AxiosInstance } from 'axios';
import {
  HomeResponse,
  FilterResponse,
  SearchResponse,
  CategoryListResponse,
  CountryListResponse,
  YearListResponse,
  MovieDetailResponse,
  ImageResponse,
  PeopleResponse,
} from '@/types/ophim';

const API_BASE_URL = process.env.NEXT_PUBLIC_OPHIM_API_BASE_URL || 'https://ophim1.com/v1/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
  },
});

// Add response timeout
apiClient.defaults.timeout = 10000;

// Cache for storing API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const getCachedData = (key: string): any | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key: string, data: any): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const ophimAPI = {
  // Get homepage data
  getHome: async (): Promise<HomeResponse> => {
    const cacheKey = 'home';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<HomeResponse>('/home');
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get movies by filter (category/country/year)
  getFilteredMovies: async (
    type: 'danh-sach' | 'the-loai' | 'quoc-gia' | 'nam-phat-hanh',
    slug: string,
    page: number = 1
  ): Promise<FilterResponse> => {
    const cacheKey = `filter-${type}-${slug}-${page}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<FilterResponse>(`/${type}/${slug}?page=${page}`);
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Search movies
  searchMovies: async (keyword: string): Promise<SearchResponse> => {
    const cacheKey = `search-${keyword}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<SearchResponse>('/tim-kiem', {
      params: { keyword },
    });
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<CategoryListResponse> => {
    const cacheKey = 'categories';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<CategoryListResponse>('/the-loai');
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get all countries
  getCountries: async (): Promise<CountryListResponse> => {
    const cacheKey = 'countries';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<CountryListResponse>('/quoc-gia');
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get all years
  getYears: async (): Promise<YearListResponse> => {
    const cacheKey = 'years';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<YearListResponse>('/nam-phat-hanh');
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get movie details
  getMovieDetail: async (slug: string): Promise<MovieDetailResponse> => {
    const cacheKey = `movie-${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<MovieDetailResponse>(`/phim/${slug}`);
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get movie images
  getMovieImages: async (slug: string): Promise<ImageResponse> => {
    const cacheKey = `images-${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<ImageResponse>(`/phim/${slug}/images`);
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get movie cast
  getMovieCast: async (slug: string): Promise<PeopleResponse> => {
    const cacheKey = `cast-${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get<PeopleResponse>(`/phim/${slug}/peoples`);
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  // Get movie keywords
  getMovieKeywords: async (slug: string): Promise<any> => {
    const cacheKey = `keywords-${slug}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get(`/phim/${slug}/keywords`);
    setCachedData(cacheKey, response.data);
    return response.data;
  },
};

export default ophimAPI;
