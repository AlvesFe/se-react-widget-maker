import { JSX, useCallback, useMemo, useState } from 'react';
import { chatApi, seApi } from './api';
import { StreamContext } from './context';
import { ChatInfo, StreamEvent } from './types';
import { chatEventFactory } from './factory';

export const StreamProvider = ({ children }: { children: JSX.Element }) => {
  const [event, setEvent] = useState<StreamEvent | null>(null);

  const onEventUpdate = (data: StreamEvent) => {
    console.log('Event update:', data);
    setEvent(data);
  };

  const onMessage = (info: ChatInfo) => {
    setEvent(chatEventFactory(info));
  };

  const createConnections = useCallback(async () => {
    await Promise.all([seApi(onEventUpdate), chatApi(onMessage)]);
  }, []);

  useMemo(() => {
    createConnections().catch(console.error);
  }, [createConnections]);

  const contextValue = useMemo(() => ({ event }), [event]);

  return (
    <StreamContext.Provider value={contextValue}>{children}</StreamContext.Provider>
  );
};
