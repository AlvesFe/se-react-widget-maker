import { useContext, useEffect, useState } from 'react';
import { ChatEvent, Event, EventTypes, FollowEvent } from './types';
import { StreamContext } from '../providers/stream-provider';

export const App = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const { event: seEvent, chat } = useContext(StreamContext);

  const addEvent = (event: Event) =>
    setEvents((prevEvents) => {
      if (prevEvents.some((e) => e.id === event.id)) {
        return prevEvents;
      }

      if (prevEvents.length >= 10) {
        return [...prevEvents.slice(1), event];
      }

      return [...prevEvents, event];
    });

  useEffect(() => {
    if (chat?.message) {
      console.info('Chat message:', chat);
      const message: ChatEvent = {
        id: chat.tags.id as string,
        displayName: chat.tags['display-name'] as string,
        message: chat.message,
        sentAt: chat.tags['tmi-sent-ts'] as string,
        type: EventTypes.CHAT,
      };

      addEvent(message);
    }
  }, [chat]);

  useEffect(() => {
    if (seEvent?.type === EventTypes.FOLLOW) {
      console.info('Follow event:', seEvent);
      const event: FollowEvent = {
        id: seEvent.activityId,
        displayName: seEvent.data.displayName,
        type: EventTypes.FOLLOW,
        followedAt: seEvent.createdAt,
      };

      addEvent(event);
    }
  }, [seEvent]);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => {
          if (event.type === EventTypes.CHAT) {
            return (
              <li key={event.id}>
                <strong>{event.displayName}</strong> sent: {event.message}
              </li>
            );
          }

          if (event.type === EventTypes.FOLLOW) {
            return (
              <li key={event.id}>
                <strong>{event.displayName}</strong> followed!
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
