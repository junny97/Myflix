export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  runtime: number;
  genres: IGenre[];
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ICast {
  name: string;
  original_name: string;
  profile_path: string;
  character: string;
}

export interface SmilerData {
  poster_path: string;
  backdrop_path: string;
  title: string;
  id: number;
}
//비슷한영화 상세정보

export interface SmilerDataResults {
  results: SmilerData[];
}
//비슷한영화 정보

export interface IGenre {
  id: number;
  name: string;
}

export interface IForm {
  keyword: string;
}
