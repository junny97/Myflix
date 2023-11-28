import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  getMovies,
  getPopMovies,
  getRateMovies,
  getComeMovies,
  LIST_TYPE,
} from '../utils/api';
import { IGetMoviesResult } from '../interface';
import { IMovie } from '../interface';
import Banner from '../Components/Banner';
import Slider from '../Components/Slider';

function Home() {
  const { isLoading, data: movieData } = useQuery<IGetMoviesResult>({
    queryKey: [LIST_TYPE[0], 'nowPlaying'],
    queryFn: getMovies,
  });

  const { data: popData } = useQuery<IGetMoviesResult>({
    queryKey: [LIST_TYPE[1], 'popular'],
    queryFn: getPopMovies,
  });

  const { data: rateData } = useQuery<IGetMoviesResult>({
    queryKey: [LIST_TYPE[2], 'rate'],
    queryFn: getRateMovies,
  });

  const { data: comeData } = useQuery<IGetMoviesResult>({
    queryKey: [LIST_TYPE[3], 'come'],
    queryFn: getComeMovies,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={popData?.results[3] as IMovie}
            detailSearchUrl={`movie/banner`}
            requestUrl={'movie'}
            menuName={'movie'}
          ></Banner>
          <Slider
            dataName='현재 상영중인 영화'
            data={movieData as IGetMoviesResult}
            mediaType='movie'
            menuName={'movie'}
            listType={LIST_TYPE[0]}
          ></Slider>
          <Slider
            dataName='인기 영화 '
            data={popData as IGetMoviesResult}
            mediaType='movie'
            menuName={'movie'}
            listType={LIST_TYPE[1]}
          ></Slider>
          <Slider
            dataName='평점이 높은 영화 '
            data={rateData as IGetMoviesResult}
            mediaType='movie'
            menuName={'movie'}
            listType={LIST_TYPE[2]}
          ></Slider>
          <Slider
            dataName='개봉 예정 영화 '
            data={comeData as IGetMoviesResult}
            mediaType='movie'
            menuName={'movie'}
            listType={LIST_TYPE[3]}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
  /* padding-bottom: 200px; */
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
