// types/tmdb.d.ts

// ---------------- Movie ----------------
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  budget: number;
  genres: Genre[];
  imdb_id: string;
  popularity: number;
  production_companies: ProductionCompany[];
  revenue: number;
  runtime: number;
  original_language: string;
}

// ---------------- TV Show ----------------
export interface TvShowDetails {
  id: number;
  name: string;
  poster_path: string;
  created_by: { id: number; name: string }[];
  episode_run_time: number[];
  genres: Genre[];
  first_air_date: string;
  networks: { id: number; name: string; logo_path: string }[];
  production_companies: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    id: number;
    season_number: number;
    air_date: string;
    episode_count: number;
  }[];
  vote_average: number;
}

// ---------------- Rated Lists ----------------
export interface RatedMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  // می‌تونی بعداً فیلدهای بیشتری اضافه کنی
}

export interface RatedTvShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}
