import { JSX, useMemo, useState } from 'react';
import { StreamContext } from './context';
import { StreamElementsEvent } from './types/stream-elements.types';
import { StreamEventFactory } from './factory';
import { StreamProviderEvent } from './types/stream-provider.types';

export const StreamProvider = ({ children }: { children: JSX.Element }) => {
  const [event, setEvent] = useState<StreamProviderEvent | null>(null);

  window.addEventListener('onEventReceived', (event: Event) => {
    const customEvent = event as CustomEvent<StreamElementsEvent>;
    const streamEvent = StreamEventFactory(customEvent.detail);
    setEvent(streamEvent);
  });

  if (import.meta.env.MODE === 'development') {
    window.sendStreamEvent = (event: StreamElementsEvent) => {
      const customEvent = new CustomEvent('onEventReceived', {
        detail: event,
      });
      window.dispatchEvent(customEvent);
    };
  }

  const contextValue = useMemo(() => ({ event }), [event]);

  return (
    <StreamContext.Provider value={contextValue}>
      {children}
    </StreamContext.Provider>
  );
};
