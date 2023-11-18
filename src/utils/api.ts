import axios from 'axios';

const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEY;

const customAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'ko',
  },
});

export const LIST_TYPE = [
  'nowPlaying',
  'popularMovies',
  'rateMovie',
  'upcomingMovies',
]; // 영상 종류

export const TV_LIST_TYPE = ['rateTv', 'PopTv', 'AiringTv', 'AirTv'];

export const getMovies = async () => {
  try {
    const response = await customAxios.get('/movie/now_playing');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPopMovies = async () => {
  try {
    const response = await customAxios.get('/movie/popular', {
      params: { page: 2 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRateMovies = async () => {
  try {
    const response = await customAxios.get('/movie/top_rated', {
      params: { page: 5 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getComeMovies = async () => {
  try {
    const response = await customAxios.get('/movie/upcoming', {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRateTv = async () => {
  try {
    const response = await customAxios.get('/tv/top_rated');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAiringTv = async () => {
  try {
    const response = await customAxios.get('/tv/airing_today');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAirTv = async () => {
  try {
    const response = await customAxios.get('/tv/on_the_air', {
      params: { page: 3 },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopTv = async () => {
  try {
    const response = await customAxios.get('/tv/popular', {
      params: { page: 3 },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDetailData = async (mediaType: string, movieId: number) => {
  try {
    const response = await customAxios.get(`/${mediaType}/${movieId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSimilarData = async (mediaType: string, movieId: number) => {
  try {
    const response = await customAxios.get(`/${mediaType}/${movieId}/similar`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export interface ISearch {
  id: number;
  poster_path: string;
  backdrop_path: string;
  media_type: string;
}

export interface IGetSearchResult {
  page: number;
  results: ISearch[]; // 영화 데이터 interface의 []
  total_pages: number;
  total_results: number;
}

export const getSearchData = async (keyword: string) => {
  try {
    const response = await customAxios.get('/search/multi', {
      params: { query: keyword },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
