import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import { IGetMoviesResult } from '../interface';
import { makeImagePath } from '../utils/utilsFn';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Modal from './Modal';
interface IData {
  data: IGetMoviesResult;
  dataName: string;
  listType: string;
  mediaType: string;
}

export default function Slider({ data, dataName, mediaType, listType }: IData) {
  const navigate = useNavigate();
  const [sliderIdx, setSliderIdx] = useState(0);
  const [back, setBack] = useState(false);
  const sliceNum = 6;
  const increaseSliderIdx = () => {
    setSliderIdx((prev) => (sliderIdx < 2 ? prev + 1 : 0));
    setBack(false);
  };
  const decreaseSliderIdx = () => {
    setSliderIdx((prev) => (sliderIdx > 0 ? prev - 1 : 2));
    setBack(true);
  };

  const handleBoxClicked = (
    movieId: number,
    mediaType: string,
    listType: string
  ) => {
    navigate(`/${mediaType}/${listType}/${movieId}`);
  };

  const modalMatch = useMatch(`/${mediaType}/${listType}/:movieId`);
  return (
    <SliderCont>
      <SlideTitle>{dataName}</SlideTitle>{' '}
      <AnimatePresence initial={false} custom={back}>
        <SliderRow
          variants={sliderVars}
          custom={back}
          initial='invisible'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 1.1 }}
          key={sliderIdx}
        >
          <div className='slideBtn prev' onClick={decreaseSliderIdx}>
            &lt;
          </div>
          <div className='slideBtn next' onClick={increaseSliderIdx}>
            &gt;
          </div>
          {data?.results
            .slice(1)
            .slice(sliceNum * sliderIdx, sliceNum * sliderIdx + 6)
            .map((movie) => (
              <SliderItem
                layoutId={movie.id + '' + listType}
                key={movie.id}
                onClick={() => handleBoxClicked(movie.id, mediaType, listType)}
                variants={slideItemVars}
                whileHover='hover'
                transition={{ type: 'tween' }}
                bgphoto={
                  movie.backdrop_path
                    ? makeImagePath(movie.backdrop_path, 'w500')
                    : 'https://nicevan001.blogpay.io/img/img_noimg.png'
                }
              >
                <span>{movie.name ? movie.name : movie.title}</span>
              </SliderItem>
            ))}
        </SliderRow>
      </AnimatePresence>
      <AnimatePresence>
        {modalMatch ? (
          <Modal
            dataId={Number(modalMatch?.params.movieId)} //모달에 정보 보냄
            listType={listType}
            mediaType={mediaType}
          />
        ) : null}
      </AnimatePresence>
    </SliderCont>
  );
}

const SliderCont = styled.div`
  position: relative;
  height: 280px;
  top: -100px;
  margin-top: 20px;
  padding: 0 10px;
`;

const SliderRow = styled(motion.div)`
  position: absolute;
  left: 10px;
  right: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  .slideBtn {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    font-size: 40px;
    color: ${({ theme }) => theme.white.darker};
    opacity: 0;
    z-index: 99;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
`;

const SliderItem = styled(motion.div)<{ bgphoto: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 30px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    url(${({ bgphoto }) => bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  word-break: keep-all;
  font-size: 28px;
  cursor: pointer;
  &:first-of-type,
  &:last-of-type {
    transform-origin: center right;
  }

  &:hover span {
    transition-delay: 0.3s;
    opacity: 1;
  }
  span {
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
`;
const SlideTitle = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.white.lighter};
  font-size: 32px;
  font-weight: bold;
`;

const sliderVars = {
  invisible: (isBack: boolean) => ({
    x: !isBack ? window.outerWidth : -window.outerWidth,
  }),
  visible: { x: 0 },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth : -window.outerWidth,
  }),
};

const slideItemVars = {
  hover: { scale: 1.3, transition: { duration: 0.3, delay: 0.3 } },
};
