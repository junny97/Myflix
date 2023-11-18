import React from 'react';
import styled from 'styled-components';
import { IMovie, IGenre, SmilerDataResults } from '../interface';
import { useNavigate, useMatch } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { makeImagePath } from '../utils/utilsFn';
import ReactStars from 'react-stars';
import { useQuery } from '@tanstack/react-query';
import { getSimilarData, getDetailData } from '../utils/api';
interface ImovieData {
  dataId: number;
  listType: string;
  mediaType: string;
  menuName: string;
  returnUrl?: string;
}

export default function Modal({
  dataId,
  listType,
  mediaType,
  menuName,
  returnUrl,
}: ImovieData) {
  const modalMatch = useMatch(`/${menuName}/${listType}/:movieId`);
  const navigate = useNavigate();

  const closeModal = () => {
    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate(-1);
    }
  };
  //해당 작품 디테일 정보 (런타임, 장르)
  const { data } = useQuery<IMovie>({
    queryKey: [listType + dataId, 'detail' + dataId],
    queryFn: () => getDetailData(mediaType, dataId),
  });

  // 해당 작품과 비슷한 장르의 작품 정보
  const { data: smilerData } = useQuery<SmilerDataResults>({
    queryKey: [mediaType + dataId, 'smiler' + dataId],
    queryFn: () => getSimilarData(mediaType, dataId),
  });

  const getGenreToString = (arr: IGenre[]): string => {
    if (arr && arr.length > 0) {
      return (
        arr.map((genre, idx) => {
          return idx + 1 === arr.length ? `${genre.name}` : `${genre.name}`;
        }) + ''
      );
    }
    return '';
  };

  return (
    <>
      <AnimatePresence>
        <OverLay
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></OverLay>
        <MovieModalBox
          key='modal'
          layoutId={modalMatch?.params.movieId + listType}
          className={data?.backdrop_path ? '' : 'active'}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ModalCoverImg bgphoto={makeImagePath(data?.backdrop_path || '')}>
            <ModalClose onClick={closeModal}>X</ModalClose>

            <ModalTextBox>
              <ModalTitle>{data?.title ? data?.title : data?.name}</ModalTitle>
              <ModalSmallTitle>
                {data?.original_title ? data?.original_title : ''}
              </ModalSmallTitle>
            </ModalTextBox>
          </ModalCoverImg>
          {/* 대형 이미지 */}

          <ModalSmallImg>
            {data?.poster_path ? (
              <img
                src={makeImagePath(data?.poster_path || '', 'w500')}
                alt='poster'
              />
            ) : (
              // <PlaceHolder>이미지가 없습니다.</PlaceHolder>
              <img
                src='https://nicevan001.blogpay.io/img/img_noimg.png'
                alt='placeholder 이미지'
              />
            )}
          </ModalSmallImg>
          {/* 작은 이미지 */}

          <ModalInfoWrapper>
            <ModalInfoBox>
              <>
                <ModalInfoItem>
                  {data?.release_date
                    ? data?.release_date.slice(0, 4)
                    : data?.first_air_date?.slice(0, 4)}
                </ModalInfoItem>
                {/* 개봉일 */}

                <ModalInfoItem>
                  {data?.runtime ? `${data?.runtime}분` : '정보없음'}
                </ModalInfoItem>
                {/* 런타임 */}
                <ModalInfoItem>
                  {getGenreToString(data?.genres || [])
                    ? getGenreToString(data?.genres || []).length > 15
                      ? getGenreToString(data?.genres || []).slice(0, 15) +
                        ' ...'
                      : getGenreToString(data?.genres || [])
                    : null}
                </ModalInfoItem>
                {/* 장르 */}

                <ModalInfoRating>
                  <ReactStars
                    count={5}
                    value={data?.vote_average ? data?.vote_average / 2 : 0}
                    color1='#E6E6E6'
                    color2='#00a7f6'
                    size={20}
                    edit={false}
                    className='rating'
                  />
                  <span>
                    {data?.vote_average.toFixed(1)} (
                    {data?.vote_count.toLocaleString()})
                  </span>
                </ModalInfoRating>
                {/* 별 rating */}

                <ModalOverview>{data?.overview}</ModalOverview>
                {/* 줄거리 */}
              </>
            </ModalInfoBox>
          </ModalInfoWrapper>

          <ModalSmilerSpan>비슷한 콘텐츠</ModalSmilerSpan>
          <ModalSmilerDiv>
            {smilerData?.results.slice(0, 4).map((smiler) => (
              <ModalSmilerImg
                key={smiler.id}
                $bgphoto={
                  makeImagePath(smiler.poster_path)
                    ? makeImagePath(smiler.poster_path || '', 'w500')
                    : makeImagePath(smiler.backdrop_path || '', 'w500')
                }
              ></ModalSmilerImg>
            ))}
          </ModalSmilerDiv>
        </MovieModalBox>
      </AnimatePresence>
    </>
  );
}

const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 99;
`;
//모달창 오버레이

const MovieModalBox = styled(motion.div)`
  position: fixed;
  width: 45rem;
  height: 40rem;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 20px;
  overflow: auto;
  z-index: 100;
  user-select: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 660px) {
    width: 100%;
    top: 0;
    height: 100%;
  }
`;
//모달창

const ModalCoverImg = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 60%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5)
    ),
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});

  position: relative;
`;

export const ModalClose = styled(motion.div)`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 20px;
  right: 13px;
  font-size: 30px;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const ModalSmallImg = styled.div`
  width: 30%;
  margin-top: -8rem;
  margin-left: 1rem;
  img {
    width: 100%;
  }
  position: absolute;

  @media only screen and (max-width: 450px) {
    width: 0%;
  }
`;
//모달창 작은 이미지

const ModalTextBox = styled.div`
  position: absolute;
  left: calc(20% + 4rem);
  float: right;
  width: 70%;
  padding-left: 2rem;
  bottom: 2rem;

  @media only screen and (max-width: 450px) {
    left: 0;
  }
`;
// 모달창 제목박스

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  position: relative;
  font-weight: 700;
  margin-bottom: 10px;

  @media only screen and (max-width: 560px) {
    font-size: 1rem;
  }
`;
//모달창 타이틀

const ModalSmallTitle = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 1rem;
  position: relative;
  font-weight: 600;

  @media only screen and (max-width: 560px) {
    font-size: 0.8rem;
  }
`;
//모달창 작은 타이틀

const ModalInfoWrapper = styled.div`
  height: 50%;

  @media only screen and (max-width: 560px) {
    height: 45%;
  }

  @media only screen and (max-width: 450px) {
    height: 40%;
  }
`;

const ModalInfoBox = styled.div`
  position: absolute;
  left: calc(20% + 4rem);
  float: right;
  width: 70%;
  height: 40%;
  padding-left: 1.5rem;
  margin-top: 0.5rem;

  @media only screen and (max-width: 450px) {
    left: 0;
    width: 100%;
  }
`;
//모달창 정보 박스

const ModalInfoItem = styled.span`
  position: relative;
  margin-left: 0.5rem;
  padding-left: 0.7rem;
  font-size: 0.9rem;
  font-weight: 700;

  ::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 0;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: #7e7e7e;
  }

  @media only screen and (max-width: 560px) {
    font-size: 0.7rem;
  }
`;
//모달창 정보 아이템

const ModalInfoRating = styled.div`
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
    font-size: 1rem;
    top: -3px;
    color: ${(props) => props.theme.white.lighter};
    font-weight: 700;
  }

  @media only screen and (max-width: 560px) {
    span {
      font-size: 0.7rem;
    }
  }
`;
//모달창 별점

const ModalOverview = styled.div`
  margin-left: 0.5rem;
  width: 95%;
  font-size: 0.9rem;
  line-height: 1.3rem;
  max-height: 13rem;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 560px) {
    font-size: 0.7rem;
    width: 88%;
  }

  @media only screen and (max-width: 450px) {
    font-size: 0.9rem;
    width: 88%;
  }
`;
//박스 클릭 모달창 정보 영화설명

const ModalSmilerSpan = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;

  @media only screen and (max-width: 560px) {
    font-size: 0.8rem;
  }
`;

const ModalSmilerDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
  gap: 10px;
  margin: 0 auto;

  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
//비슷한 영화 div

const ModalSmilerImg = styled.div<{ $bgphoto: string }>`
  height: 13rem;
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
`;
//비슷한 영화 이미지
