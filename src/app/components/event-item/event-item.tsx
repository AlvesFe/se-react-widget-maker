import { v4 } from 'uuid';
import { Emote } from '../../../providers/stream-provider/types/stream-elements.types';
import { DefaultState, EventTypeStateMap } from './event-item.constansts';
import { EventItemContainer, MessageContainer } from './event-item.style';
import {
  StreamEventData,
  StreamProviderEvent,
} from '../../../providers/stream-provider/types/stream-provider.types';

const buildMessageArray = (message: string, emotes: Emote[]) => {
  const words = message.split(' ');
  return words
    .map((word) => {
      const emote = emotes.find((emote) => emote.name === word);
      if (emote) {
        const url = emote.urls[4] ?? emote.urls[2] ?? emote.urls[1];
        const uuid = v4();
        return `<img class="emote-image" key=${uuid} src=${url} alt=${emote.name} />`;
      }
      return word;
    })
    .join('');
};

export const EventItem = ({
  event,
}: Readonly<{ event: StreamProviderEvent }>) => {
  const state = EventTypeStateMap.get(event.type) ?? DefaultState;
  if (event.type === 'message') {
    const messageData = event.data as Required<StreamEventData>;
    return (
      <EventItemContainer color={state}>
        <span>
          <strong>{event.data.displayName}</strong> sent:
        </span>
        <MessageContainer
          dangerouslySetInnerHTML={{
            __html: buildMessageArray(messageData.message, messageData.emotes),
          }}
        />
      </EventItemContainer>
    );
  }

  if (event.type === 'follow' || event.type === 'follower-latest') {
    return (
      <EventItemContainer color={state}>
        <span>
          <strong>{event.data.displayName}</strong> followed!
        </span>
      </EventItemContainer>
    );
  }

  if (event.type === 'subscriber') {
    return (
      <EventItemContainer color={state}>
        <span>
          <strong>{event.data.displayName}</strong> subscribed!
        </span>
      </EventItemContainer>
    );
  }

  if (event.type === 'cheer') {
    return (
      <EventItemContainer color={state}>
        <span>
          <strong>{event.data.displayName}</strong> cheered {event.data.amount}{' '}
          bits!
        </span>
      </EventItemContainer>
    );
  }

  if (event.type === 'raid') {
    return (
      <EventItemContainer color={state}>
        <span>
          <strong>{event.data.displayName}</strong> raided with{' '}
          {event.data.amount} viewers!
        </span>
      </EventItemContainer>
    );
  }

  console.warn('Not rendering event', event);
  return null;
};
