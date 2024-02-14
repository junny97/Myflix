import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';
import Header from './Components/Header';

const Movie = lazy(() => import('./Routes/Movie'));
const Search = lazy(() => import('./Routes/Search'));
const Tv = lazy(() => import('./Routes/Tv'));

const AppContainer = styled.main`
  font-family: 'Noto Sans KR', sans-serif;
`;

function App() {
  return (
    <AppContainer>
      <HelmetProvider>
        <Helmet>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap'
            rel='stylesheet'
          />
        </Helmet>
      </HelmetProvider>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Movie />} />
            <Route path='/movie/:listType/:movieId' element={<Movie />} />
            <Route path='/tv' element={<Tv />} />
            <Route path='/tv/:listType/:movieId' element={<Tv />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:menuName/:movieId' element={<Search />} />
          </Routes>
        </Suspense>
      </Router>
    </AppContainer>
  );
}

export default App;
