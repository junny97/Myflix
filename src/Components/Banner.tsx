import styled from 'styled-components';
import { IMovie } from '../interface';
import { makeImagePath } from '../utils/utilsFn';
import ReactStars from 'react-stars';
import { useMatch, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from './Modal';

interface IBanner {
  bannerInfo: IMovie;
  detailSearchUrl: string;
  requestUrl: string;
  menuName: string;
}

export default function Banner({
  detailSearchUrl,
  requestUrl,
  bannerInfo,
  menuName,
}: IBanner) {
  const navigate = useNavigate();

  const handleBoxClicked = (id: number) => {
    navigate(`/${detailSearchUrl}/${id}`);
  };

  const modalMatch = useMatch(`/${detailSearchUrl}/:movieId`);

  return (
    <Wrapper $bgPhoto={makeImagePath(bannerInfo?.backdrop_path || '')}>
      <>
        <Title>
          {bannerInfo?.title ? bannerInfo?.title : bannerInfo?.name}
        </Title>
        <Overview>{bannerInfo?.overview}</Overview>
        <InfoRating>
          <ReactStars
            count={5}
            value={bannerInfo?.vote_average ? bannerInfo?.vote_average / 2 : 0}
            color1='#E6E6E6'
            color2='#00a7f6'
            half
            size={20}
            edit={false}
            className='rating'
          />
          <span>
            {bannerInfo?.vote_average.toFixed(1)} (
            {bannerInfo?.vote_count.toLocaleString()})
          </span>
          <InfoBtn
            onClick={() => {
              handleBoxClicked(Number(bannerInfo?.id));
            }}
          >
            <span>
              <i className='fa-regular fa-circle-question'></i> 상세 정보
            </span>
          </InfoBtn>
        </InfoRating>
        {/* 별 rating + 버튼 */}

        <AnimatePresence>
          {modalMatch ? (
            <Modal
              dataId={Number(modalMatch?.params.movieId)} //모달에 정보 보냄
              listType={'banner'}
              mediaType={requestUrl}
              menuName={menuName}
            />
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $bgPhoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  min-height: 40rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  overflow: hidden;
  user-select: none;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 15px;
  font-weight: 700;
`;

const Overview = styled.p`
  font-size: 1.3rem;
  width: 45%;
  padding-left: 10px;
  font-weight: 700;
  line-height: 1.5rem;
  font-weight: 400;
`;

const InfoRating = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  .rating {
    overflow: hidden;
    margin: 0;
  }
  span {
    top: -3px;
    color: ${(props) => props.theme.white.darker};
    font-weight: 700;
  }
  @media only screen and (max-width: 400px) {
    margin-left: 0;
  }
`;

const InfoBtn = styled.button`
  position: absolute;
  top: 3rem;
  left: 0;
  width: 7rem;
  height: 170%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.black.lighter};
  background-color: rgba(109, 109, 110, 0.7);
  font-size: 15px;
  opacity: 0.8;
  span {
    color: white;
    font-weight: 700;
  }

  &:hover {
    background-color: ${(props) => props.theme.black.darker};
    cursor: pointer;

    span {
      color: ${(props) => props.theme.white.darker};
    }
  }
`;
