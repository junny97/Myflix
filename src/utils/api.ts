import axios from 'axios';

const API_KEY = 'd90f98a8d4a4304af3042e12308b63b5';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );
  return response.data;
};
