import { JSX, useCallback, useMemo, useState } from 'react';
import { chatApi, seApi } from './api';
import { StreamContext } from './context';
import { ChatInfo, StreamEvent } from './types';

export const StreamProvider = ({ children }: { children: JSX.Element }) => {
  const [event, setEvent] = useState<StreamEvent | null>(null);
  const [chat, setChat] = useState<ChatInfo | null>(null);

  const onEventUpdate = (data: StreamEvent) => {
    setEvent(data);
  };

  const onMessage = (info: ChatInfo) => {
    setChat(info);
  };

  const createConnections = useCallback(async () => {
    await Promise.all([seApi(onEventUpdate), chatApi(onMessage)]);
  }, []);

  useMemo(() => {
    createConnections();
  }, [createConnections]);

  const contextValue = useMemo(() => ({ event, chat }), [event, chat]);

  return (
    <StreamContext.Provider value={contextValue}>{children}</StreamContext.Provider>
  );
};
