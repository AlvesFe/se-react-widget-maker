import { useState } from 'react';
import { DispatchButton, OptionsMenu } from './event-dispatcher.style';
import { EVENT_TYPES } from './constants';
import { generateMockEvent } from '../util/event-mock-factory';

export const EventDispatcher = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const dispatchEvent = (type: string) => {
    const event = generateMockEvent(type);
    const customEvent = new CustomEvent('onEventReceived', {
      detail: event,
    });

    window.dispatchEvent(customEvent);
  }

  if (import.meta.env.MODE === 'production') {
    return children;
  }

  return (
    <>
      {children}
      {optionsVisible && (
        <OptionsMenu>
          {EVENT_TYPES.map((type) => (
            <button key={type} onClick={() => dispatchEvent(type)}>
              {type}
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
