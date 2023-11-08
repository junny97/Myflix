import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
