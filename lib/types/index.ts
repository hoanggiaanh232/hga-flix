// Movie Types
export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
  created?: {
    time: string;
  };
  modified?: {
    time: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Country {
  _id: string;
  name: string;
  slug: string;
}

export interface MovieDetail extends Movie {
  episodes: Episode[];
}

export interface Episode {
  server_name: string;
  server_data: EpisodeData[];
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface HomeData {
  singlePage: Movie[];
  collections: Collection[];
}

export interface Collection {
  _id: string;
  name: string;
  slug: string;
  items: Movie[];
}

export interface SearchResponse {
  data: {
    items: Movie[];
  };
}

export interface ListResponse {
  data: {
    items: Movie[];
    params: {
      pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
      };
    };
  };
}

export interface CategoryListResponse {
  data: Category[];
}

export interface CountryListResponse {
  data: Country[];
}

export interface YearListResponse {
  data: Array<{
    _id: string;
    name: string;
  }>;
}
