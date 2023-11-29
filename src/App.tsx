import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Movie from './Routes/Movie';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';
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
        <Routes>
          <Route path='/' element={<Movie />} />
          <Route path='/movie/:listType/:movieId' element={<Movie />} />
          <Route path='/tv' element={<Tv />} />
          <Route path='/tv/:listType/:movieId' element={<Tv />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/:menuName/:movieId' element={<Search />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}
export default App;
