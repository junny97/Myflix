import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { IGetMoviesResult } from '../interface';
import { getMovies } from '../utils/api';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { makeImagePath } from '../utils/utilsFn';

interface ImoveData {
  movieData?: IGetMoviesResult;
}

export default function Modal({ movieData }: ImoveData) {
  const modalMatch = useMatch('/movies/:movieId');
  const navigate = useNavigate();

  const hanldeOverlayClicked = () => {
    navigate(-1);
  };

  const clickMovieBox =
    modalMatch?.params.movieId &&
    movieData?.results.find(
      (movie) => movie.id === Number(modalMatch.params.movieId)
    );

  return (
    <div>
      <AnimatePresence>
        {modalMatch ? (
          <>
            <ModalOverlay
              variants={overlayVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              onClick={hanldeOverlayClicked}
            />
            <ModalBox layoutId={modalMatch.params.movieId}>
              {clickMovieBox && (
                <>
                  <MovieCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickMovieBox.backdrop_path,
                        'w500'
                      )})`,
                    }}
                  />
                  <MovieTitle>{clickMovieBox.title}</MovieTitle>
                  <MovieOverview>{clickMovieBox.overview}</MovieOverview>
                </>
              )}
            </ModalBox>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalBox = styled(motion.div)`
  position: fixed;
  width: 50vw;
  height: 70vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const MovieCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const MovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const MovieOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};
