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

export const getMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );
  return response.data;
};
