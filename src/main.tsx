import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { StreamProvider } from './providers/stream-provider';
import { GlobalStyle } from './global-style.ts';

createRoot(document.getElementById('root')!).render(
  <StreamProvider>
    <StrictMode>
      <GlobalStyle />
      <App />
    </StrictMode>
  </StreamProvider>,
);
