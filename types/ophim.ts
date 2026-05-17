// Types for OPhim API
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
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor?: string[];
  director?: string[];
  category?: Category[];
  country?: Country[];
  created?: CreatedInfo;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface CreatedInfo {
  time: string;
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

export interface HomeResponse {
  status: boolean;
  data: {
    sectionList: Section[];
  };
}

export interface Section {
  section_type: string;
  section_name: string;
  section_slug: string;
  items: Movie[];
}

export interface FilterResponse {
  status: boolean;
  data: {
    items: Movie[];
    pagination: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface SearchResponse {
  status: boolean;
  data: {
    items: Movie[];
  };
}

export interface CategoryListResponse {
  status: boolean;
  data: Category[];
}

export interface CountryListResponse {
  status: boolean;
  data: Country[];
}

export interface YearListResponse {
  status: boolean;
  data: number[];
}

export interface MovieDetailResponse {
  status: boolean;
  data: MovieDetail;
}

export interface ImageResponse {
  status: boolean;
  data: string[];
}

export interface PeopleResponse {
  status: boolean;
  data: any[];
}
