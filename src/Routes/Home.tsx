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
import { makeImagePath } from '../utils/utilsFn';
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
            $bgPhoto={makeImagePath(movieData?.results[0].backdrop_path || '')}
          >
            <Title>{movieData?.results[0].title}</Title>
            <OverView>{movieData?.results[0].overview}</OverView>
          </Banner>
          <Slider
            dataName='현재 상영중인 영화'
            data={movieData as IGetMoviesResult}
            mediaType='movie'
            listType={LIST_TYPE[0]}
          ></Slider>
          <Slider
            dataName='인기 영화 '
            data={popData as IGetMoviesResult}
            mediaType='movie'
            listType={LIST_TYPE[1]}
          ></Slider>
          <Slider
            dataName='평점이 높은 영화 '
            data={rateData as IGetMoviesResult}
            mediaType='movie'
            listType={LIST_TYPE[2]}
          ></Slider>
          <Slider
            dataName='개봉 예정 영화 '
            data={comeData as IGetMoviesResult}
            mediaType='movie'
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
