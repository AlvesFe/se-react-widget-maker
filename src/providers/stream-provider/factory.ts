import { EventListener, FollowerLatestEvent, MessageEvent, StreamElementsEvent } from './types/stream-elements.types';
import { CheerEventData, CommonStreamEvent, FollowEventData, RaidEventData, StreamEventType, StreamProviderEvent, SubscriberEventData } from './types/stream-provider.types';

const SEToStreamEventTypeMap: ReadonlyMap<string, CommonStreamEvent['type']> = new Map([
  ['subscriber', StreamEventType.SUBSCRIBER],
  ['cheer', StreamEventType.CHEER],
  ['raid', StreamEventType.RAID],
  ['follow', StreamEventType.FOLLOW],
]);

export const StreamEventFactory = (seEvent: StreamElementsEvent): StreamProviderEvent | null => {
  try {
    const { event, listener } = seEvent;

    if (listener === 'follower-latest') {
      return FollowerLatestEventFactory(event);
    }

    if (listener === 'message') {
      return MessageEventFactory(event);
    }

    if (listener === 'event') {
      return EventFactory(seEvent);
    }

    console.warn('Event not processed', { listener });
    return null;
  }
  catch (error) {
    console.error('Error processing event', { error, seEvent });
    return null;
  }
};

export const FollowerLatestEventFactory = (seEvent: FollowerLatestEvent): StreamProviderEvent => {
  const date = new Date().toISOString();
  return {
    type: StreamEventType.FOLLOWER_LATEST,
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
    type: StreamEventType.MESSAGE,
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

export const EventFactory = ({ event }: EventListener): CommonStreamEvent => {
  const type = SEToStreamEventTypeMap.get(event.type)
  if (!type) {
    throw new Error(`Unknown event type: ${event.type}`);
  }

  const baseEvent = {
    type,
    id: event.activityId,
    channel: event.channel,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    isMock: event.isMock,
    data: {},
  }


  if (event.type === 'cheer') {
    const data: CheerEventData  = {
      amount: event.data.amount,
      message: event.data.message,
      avatar: event.data.avatar,
      displayName: event.data.displayName,
      username: event.data.username,
    }

    baseEvent.data = data;
  }

  if (event.type === 'subscriber') {
    const data: SubscriberEventData = {
      message: event.data.message,
      amount: event.data.amount,
      avatar: event.data.avatar,
      displayName: event.data.displayName,
      username: event.data.username,
    }

    baseEvent.data = data;
  }

  if (event.type === 'raid') {
    const data: RaidEventData = {
      amount: event.data.amount,
      avatar: event.data.avatar,
      displayName: event.data.displayName,
      username: event.data.username,
    }

    baseEvent.data = data;
  }

  if (event.type === 'follow') {
    const data: FollowEventData = {
      avatar: event.data.avatar,
      displayName: event.data.displayName,
      username: event.data.username,
    }

    baseEvent.data = data;
  }

  return baseEvent as CommonStreamEvent;
};