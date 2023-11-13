import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
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
          <Route path='/' element={<Home />} />
          <Route path='/movie/:listType/:movieId' element={<Home />} />
          <Route path='/tv' element={<Tv />} />
          <Route path='/tv/:listType/:movieId' element={<Tv />} />
          <Route path='/search/:word' element={<Search />} />
          <Route path='/search/:word/:id' element={<Search />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}
export default App;
