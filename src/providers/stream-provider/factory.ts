import { EventListener, FollowerLatestEvent, MessageEvent, StreamElementsEvent } from './types/stream-elements.types';
import { StreamEventType, StreamProviderEvent } from './types/stream-provider.types';

export const StreamEventFactory = (seEvent: StreamElementsEvent): StreamProviderEvent | null => {
  const { event, listener } = seEvent;

  switch (listener) {
    case 'follower-latest':
      return FollowerLatestEventFactory(event);
    case 'message':
      return MessageEventFactory(event);
    case 'event':
      return EventFactory(seEvent);
    default:
      console.warn('Unknown event type', seEvent);
      return null;
  }
};

export const FollowerLatestEventFactory = (seEvent: FollowerLatestEvent): StreamProviderEvent => {
  const date = new Date().toISOString();
  return {
    type: 'follower-latest',
    id: seEvent._id,
    createdAt: date,
    updatedAt: date,
    isMock: false,
    data: {
      displayName: seEvent.displayName,
      username: seEvent.name,
    },
  }
}

export const MessageEventFactory = (seEvent: MessageEvent): StreamProviderEvent => {
  const date = new Date(seEvent.data.time).toISOString();
  return {
    type: 'message',
    id: seEvent.data.msgId,
    channel: seEvent.data.channel,
    createdAt: date,
    updatedAt: date,
    isMock: false,
    data: {
      displayName: seEvent.data.displayName,
      username: seEvent.data.nick,
      message: seEvent.data.text,
      emotes: seEvent.data.emotes,
      badges: seEvent.data.badges,
      displayColor: seEvent.data.displayColor,
    },
  }
};

export const EventFactory = ({ event }: EventListener): StreamProviderEvent => {
  const baseEvent: StreamProviderEvent = {
    id: event.activityId,
    type: event.type as StreamEventType,
    channel: event.channel,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    isMock: event.isMock,
    data: {
      displayName: event.data.displayName,
      username: event.data.username,
      avatar: event.data.avatar,
    },
  }

  if (event.type === 'cheer') {
    baseEvent.data.amount = event.data.amount;
    baseEvent.data.message = event.data.message;
  }

  if (event.type === 'subscriber' && event.data.message) {
    baseEvent.data.message = event.data.message
  }

  if (event.type === 'raid') {
    baseEvent.data.amount = event.data.amount;
  }

  return baseEvent;
};