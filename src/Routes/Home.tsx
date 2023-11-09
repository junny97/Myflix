import { useState } from 'react';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies } from '../utils/api';
import { IGetMoviesResult } from '../interface';
import { makeImagePath } from '../utils/utilsFn';
import { motion, AnimatePresence } from 'framer-motion';
import useWindowDimensions from '../hook/useWindowDimensions';

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });
  const offset = 6;
  const width = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch('/movies/:movieId');

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const handleBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const hanldeOverlayClicked = () => {
    navigate(-1);
  };

  const clickMovieBox =
    moviePathMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id === Number(moviePathMatch.params.movieId)
    );

  // console.log(moviePathMatch);
  console.log(clickMovieBox);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <MovieBox
                      layoutId={String(movie.id)} //toString
                      key={movie.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => handleBoxClicked(movie.id)}
                      $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                    >
                      <MovieInfo variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </MovieInfo>
                    </MovieBox>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {moviePathMatch ? (
              <>
                <ModalOverlay
                  variants={overlayVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  onClick={hanldeOverlayClicked}
                />
                <ModalBox layoutId={moviePathMatch.params.movieId}>
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
        </>
      )}
    </Wrapper>
  );
}
export default Home;

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
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
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const MovieBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const MovieInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

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

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};
