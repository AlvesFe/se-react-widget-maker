import { useState } from 'react';
import { DispatchButton, OptionsMenu } from './event-dispatcher.style';
import { EVENT_TYPES, EVENT_TYPES_MAP } from './constants';
import { generateMockEvent } from '../util/event-mock-factory';

export const EventDispatcher = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showEventDispatcher, setShowEventDispatcher] = useState(
    import.meta.env.MODE !== 'production',
  );

  const dispatchEvent = (type: string) => {
    const event = generateMockEvent(type);
    const customEvent = new CustomEvent('onEventReceived', {
      detail: event,
    });

    window.dispatchEvent(customEvent);
  };

  window.toggleEventDispatcher = () =>
    setShowEventDispatcher(!showEventDispatcher);

  if (!showEventDispatcher) {
    return children;
  }

  return (
    <>
      {children}
      {optionsVisible && (
        <OptionsMenu>
          {EVENT_TYPES.map((type) => (
            <button key={type} onClick={() => dispatchEvent(type)}>
              {EVENT_TYPES_MAP[type]}
            </button>
          ))}
        </OptionsMenu>
      )}
      <DispatchButton onClick={() => setOptionsVisible(!optionsVisible)}>
        +
      </DispatchButton>
    </>
  );
};
