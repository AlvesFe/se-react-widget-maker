import { useCallback, useContext, useEffect, useState } from 'react';
import { StreamContext } from '../providers/stream-provider';
import { EventItem } from './components/event-item';
import { EventWrapperContainer } from './styles';
import { StreamProviderEvent } from '../providers/stream-provider/types/stream-provider.types';

// This is a sample component that listens to the StreamContext and displays the events
// that are dispatched to it. It will only display the last 10 events.
export const App = () => {
  const [events, setEvents] = useState<StreamProviderEvent[]>([]);

  const { event: seEvent } = useContext(StreamContext);

  const addEvent = useCallback((event: StreamProviderEvent) => {
    setEvents((prevEvents) => {
      if (prevEvents.some((e) => e.id === event.id)) {
        return prevEvents;
      }

      if (prevEvents.length >= 10) {
        return [...prevEvents.slice(1), event];
      }

      return [...prevEvents, event];
    });
  }, []);
    

  useEffect(() => {
    if (!seEvent) {
      return;
    }
    addEvent(seEvent);
  }, [seEvent, addEvent]);

  return (
    <EventWrapperContainer>
      <h1>Events</h1>
      {events.map((event) => (
        // This is a sample component that displays the event data
        <EventItem key={event.id} event={event} />
      ))}
    </EventWrapperContainer>
  );
};
