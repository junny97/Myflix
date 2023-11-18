import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import Slider from '../Components/Slider';
import { IGetMoviesResult } from '../interface';
import { IMovie } from '../interface';
import {
  getRateTv,
  getAiringTv,
  getAirTv,
  getPopTv,
  TV_LIST_TYPE,
} from '../utils/api';
import Banner from '../Components/Banner';

function Tv() {
  const { isLoading, data: rateTvData } = useQuery<IGetMoviesResult>({
    queryKey: [TV_LIST_TYPE[0], 'rateTv'],
    queryFn: getRateTv,
  });
  const { data: popTvData } = useQuery<IGetMoviesResult>({
    queryKey: [TV_LIST_TYPE[1], 'PopTv'],
    queryFn: getPopTv,
  });
  const { data: airingTvData } = useQuery<IGetMoviesResult>({
    queryKey: [TV_LIST_TYPE[2], 'AiringTv'],
    queryFn: getAiringTv,
  });
  const { data: airTvData } = useQuery<IGetMoviesResult>({
    queryKey: [TV_LIST_TYPE[3], 'AirTv'],
    queryFn: getAirTv,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={rateTvData?.results[0] as IMovie}
            detailSearchUrl={`tv/banner`}
            requestUrl={'tv'}
            menuName={'tv'}
          ></Banner>

          <Slider
            dataName='평점이 높은 TV 프로그램'
            data={rateTvData as IGetMoviesResult}
            mediaType='tv'
            menuName='tv'
            listType={TV_LIST_TYPE[0]}
          ></Slider>
          <Slider
            dataName='인기있는 TV 프로그램 '
            data={popTvData as IGetMoviesResult}
            mediaType='tv'
            menuName='tv'
            listType={TV_LIST_TYPE[1]}
          ></Slider>
          <Slider
            dataName='최신 TV 프로그램 '
            data={airingTvData as IGetMoviesResult}
            mediaType='tv'
            menuName='tv'
            listType={TV_LIST_TYPE[2]}
          ></Slider>
          <Slider
            dataName='방영중인 TV 프로그램 '
            data={airTvData as IGetMoviesResult}
            mediaType='tv'
            menuName='tv'
            listType={TV_LIST_TYPE[3]}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
