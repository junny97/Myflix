import axios from 'axios';

/*
TheMovieDB API Key
https://www.themoviedb.org/settings/api?language=ko

TheMovieDB API Document
https://developers.themoviedb.org/3/movies/get-now-playing

TheMovieDB Image
이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 
*/

const API_KEY = 'd90f98a8d4a4304af3042e12308b63b5';

const BASE_URL = 'https://api.themoviedb.org/3';

export const LIST_TYPE = [
  'nowPlaying', //0
  'popularMovies', //1
  'rateMovie', //2
  'upcomingMovies', //3
]; // 영상 종류

export const TV_LIST_TYPE = ['rateTv', 'PopTv', 'AiringTv', 'AirTv'];

export const getMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/now_playing?language=ko&api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPopMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?language=ko&api_key=${API_KEY}&page=2`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRateMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko&page=5`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getComeMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getRateTv = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAiringTv = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAirTv = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=3`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getPopTv = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko&page=3`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDetailInfo = async (mediaType: string, movieId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}&language=ko`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const similarData = async (mediaType: string, movieId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${movieId}/similar?api_key=${API_KEY}&language=ko`
    );
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

export const getSearch = async (search: string) => {
  try {
    const encodedSearch = encodeURIComponent(search); // 검색어를 URL-safe한 형태로 인코딩
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodedSearch}&include_adult=false&language=ko&page=1`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
