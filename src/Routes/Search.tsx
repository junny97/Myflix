import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { IGetSearchResult, getSearchData } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { makeImagePath } from '../utils/utilsFn';
import Modal from '../Components/Modal';

function Search() {
  const location = useLocation();
  const keyword = location.state ? location.state.key : null;
  // const keyword = new URLSearchParams(location.search).get('keyword');

  const { isLoading, data } = useQuery<IGetSearchResult>({
    queryKey: ['search', keyword],
    queryFn: () => getSearchData(keyword || ''),
  });

  const navigate = useNavigate();

  const onBoxClicked = (menuName: string, id: number) => {
    navigate(`/search/${menuName}/${id}?keyword=${keyword}`);
    console.log(menuName, id, keyword);
  };
  const modalMatch = useMatch(`/search/:menuName/:movieId`);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SearchResultDiv>
            <SearchResultSpan>
              "{keyword}"(으)로 검색한 결과입니다.
            </SearchResultSpan>
            {data && data.results.length > 0 ? (
              <Row>
                {data?.results.map((movie) => (
                  <Box
                    layoutId={movie.id + '' + movie.media_type}
                    key={movie.id}
                    bgphoto={makeImagePath(movie?.poster_path || '', 'w500')}
                    variants={boxVar}
                    whileHover='hover'
                    initial='normal'
                    transition={{ type: 'tween' }}
                    onClick={() => onBoxClicked(movie.media_type, movie.id)}
                  ></Box>
                ))}
              </Row>
            ) : (
              <SearchNoResultSpan>
                "{keyword}"의 검색 결과가 없습니다.
              </SearchNoResultSpan>
            )}
          </SearchResultDiv>

          <AnimatePresence>
            {modalMatch ? (
              <Modal
                dataId={Number(modalMatch.params.movieId)}
                mediaType={modalMatch.params.menuName || ''}
                menuName={'search'}
                listType={modalMatch?.params.menuName || ''}
                returnUrl={`/search?keyword=${keyword}`}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Search;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background: black;
`;
//전체화면

const SearchResultDiv = styled.div`
  position: absolute;
  width: 90%;
  height: calc(100vh - 9rem);
  bottom: 0;
  margin-left: 3rem;
  margin-right: 3rem;
  background-color: transparent;
`;
//검색결과 div

const SearchResultSpan = styled.div`
  font-size: 20px;
  padding-bottom: 3rem;
  padding-left: 1.5rem;
`;
//검색결과 span

const SearchNoResultSpan = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const Row = styled(motion.div)`
  position: absolute;
  left: 0.625rem;
  right: 0.625rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.625rem;
`;
//슬라이더 열

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 17rem;
  font-size: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    transform-origin: center left; //변화하는 기준점
  }
  &:last-child {
    transform-origin: center right;
  }
`;
//슬라이더 내용

const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -20,
    scale: 1.1,
    transition: {
      delay: 0.3,
      type: 'tween',
    },
  },
};
