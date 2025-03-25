import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { StreamProvider } from './providers/stream-provider';
import { GlobalStyle } from './global-style.ts';
import { EventDispatcher } from './__dev__/event-dispatcher/event-dispatcher.tsx';

createRoot(document.getElementById('root')!).render(
  <StreamProvider>
    <StrictMode>
      <GlobalStyle />
      <EventDispatcher>
        <App />
      </EventDispatcher>
    </StrictMode>
  </StreamProvider>,
);
