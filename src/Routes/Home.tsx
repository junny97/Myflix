import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import {
  getMovies,
  getPopMovies,
  getRateMovies,
  getComeMovies,
} from '../utils/api';
import { IGetMoviesResult } from '../interface';
import { makeImagePath } from '../utils/utilsFn';
import Slider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Modal from '../Components/Modal';

function Home() {
  const { isLoading, data: movieData } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });

  const { data: popData } = useQuery<IGetMoviesResult>({
    queryKey: ['popMovies', 'popular'],
    queryFn: getPopMovies,
  });

  const { data: rateData } = useQuery<IGetMoviesResult>({
    queryKey: ['rateMovies', 'rate'],
    queryFn: getRateMovies,
  });

  const { data: comeData } = useQuery<IGetMoviesResult>({
    queryKey: ['comeMovies', 'come'],
    queryFn: getComeMovies,
  });

  const modalMatch = useMatch(`/movies/:movieId`);

  const allData = [
    ...(movieData?.results ? movieData?.results : []),
    ...(popData?.results ? popData?.results : []),
    ...(rateData?.results ? rateData?.results : []),
    ...(movieData?.results ? movieData?.results : []),
  ];

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(movieData?.results[0].backdrop_path || '')}
          >
            <Title>{movieData?.results[0].title}</Title>
            <OverView>{movieData?.results[0].overview}</OverView>
          </Banner>
          <Slider dataName='현재 상영중인 영화' data={movieData}></Slider>
          <Slider dataName='인기 영화 ' data={popData}></Slider>
          <Slider dataName='평점이 높은 영화 ' data={rateData}></Slider>
          <Slider dataName='개봉 예정 영화 ' data={comeData}></Slider>

          {modalMatch ? <Modal movieData={allData}></Modal> : null}
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

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  p {
    line-height: 1.5;
  }
`;

const Title = styled.h2`
  font-size: 68px;
`;

const OverView = styled.p`
  font-size: 24px;
  width: 50%;
`;
