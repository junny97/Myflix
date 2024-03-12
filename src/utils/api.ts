import axios from 'axios';
import { IVideo } from '../interface';
const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const customAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

const SLICE_INDEX = 12;

export async function getMovieList(category: string, lang: string) {
  const response = await customAxios.get(`movie/${category}?language=${lang}`);

  return response.data.results.slice(0, SLICE_INDEX);
}

export async function getTvList(category: string, lang: string) {
  const response = await customAxios.get(`tv/${category}?language=${lang}`);

  return response.data.results.slice(0, SLICE_INDEX);
}

export async function getDetails(section: string, id: string, lang: string) {
  const response = await customAxios.get(`${section}/${id}?language=${lang}`);

  return response.data;
}

export async function getCast(section: string, id: string, lang: string) {
  const response = await customAxios.get(
    `${section}/${id}/credits?language=${lang}`
  );

  return response.data.cast;
}

export async function getVideos(section: string, id: string, lang: string) {
  const response = await customAxios.get(
    `${section}/${id}/videos?language=${lang}`
  );
  const youtubeVideos = response.data.results.filter(
    (video: IVideo) => video.site === 'youtube' || 'Youtube'
  );

  return youtubeVideos;
}

export async function getRecommendations(
  section: string,
  id: string,
  lang: string
) {
  const response = await customAxios.get(
    `${section}/${id}/recommendations?language=${lang}`
  );

  return response.data.results;
}

export async function getSimilar(section: string, id: string, lang: string) {
  const response = await customAxios.get(
    `${section}/${id}/similar?language=${lang}`
  );

  return response.data.results;
}

export async function getMovieSearch(
  keyword: string,
  pageParam: number,
  lang: string
) {
  console.log(`movie search ${keyword} ${pageParam} 시작`);
  console.log('pageParam:', pageParam);
  const params = { page: pageParam, query: keyword, language: lang };
  const response = await customAxios.get('search/movie', { params });

  return response;
}

export async function getTvSearch(
  keyword: string,
  pageParam: number,
  lang: string
) {
  console.log(`tv search ${keyword} ${pageParam} 시작`);

  const params = { page: pageParam, query: keyword, language: lang };
  const response = await customAxios.get('search/tv', { params });

  console.log(`tv search ${keyword} ${pageParam} 끝`);

  return response;
}
