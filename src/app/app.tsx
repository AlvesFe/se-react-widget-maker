import { useContext, useEffect, useState } from 'react';
import { StreamContext } from '../providers/stream-provider';
import { EventItem } from './components/event-item';
import { EventTypes, StreamEvent } from '../providers/stream-provider/types';
import { EventWrapperContainer } from './styles';

// This is a sample component that listens to the StreamContext and displays the events
// that are dispatched to it. It will only display the last 10 events.
export const App = () => {
  const [events, setEvents] = useState<StreamEvent[]>([]);

  const { event: seEvent } = useContext(StreamContext);

  const addEvent = (event: StreamEvent) =>
    setEvents((prevEvents) => {
      if (prevEvents.some((e) => e.activityId === event.activityId)) {
        return prevEvents;
      }

      if (prevEvents.length >= 10) {
        return [...prevEvents.slice(1), event];
      }

      return [...prevEvents, event];
    });

  useEffect(() => {
    if (!seEvent || !Object.values(EventTypes).includes(seEvent.type)) {
      return;
    }
    addEvent(seEvent);
  }, [seEvent]);

  return (
    <EventWrapperContainer>
      <h1>Events</h1>
      {events.map((event) => (
        // This is a sample component that displays the event data
        <EventItem key={event.activityId} event={event} />
      ))}
    </EventWrapperContainer>
  );
};
