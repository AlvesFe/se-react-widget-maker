import {
  ChatEvent,
  CheerSeEvent,
  EventTypes,
  FollowSeEvent,
  RaidSeEvent,
  StreamEvent,
  SubscribeSeEvent,
} from '../../../providers/stream-provider/types';
import { DefaultState, EventTypeStateMap } from './event-item.constansts';
import { EventItemContainer } from './event-item.style';

export const EventItem = ({ event }: Readonly<{ event: StreamEvent }>) => {
  const state = EventTypeStateMap.get(event.type) ?? DefaultState;
  if (event.type === EventTypes.CHAT) {
    const chatEvent = event as ChatEvent;
    return (
      <EventItemContainer color={state}>
        <strong>{chatEvent.data.displayName}</strong> sent:{' '}
        {chatEvent.data.message}
      </EventItemContainer>
    );
  }

  if (event.type === EventTypes.FOLLOW) {
    const followEvent = event as FollowSeEvent;
    return (
      <EventItemContainer color={state}>
        <div>
          <strong>{followEvent.data.displayName}</strong> followed!
        </div>
      </EventItemContainer>
    );
  }

  if (event.type === EventTypes.CHEER) {
    const cheerEvent = event as CheerSeEvent;
    return (
      <EventItemContainer color={state}>
        <div>
          <strong>{cheerEvent.data.displayName}</strong> cheered{' '}
          {cheerEvent.data.amount} bits!
        </div>
      </EventItemContainer>
    );
  }

  if (event.type === EventTypes.RAID) {
    const raidEvent = event as RaidSeEvent;
    return (
      <EventItemContainer color={state}>
        <div>
          <strong>{raidEvent.data.displayName}</strong> raided with{' '}
          {raidEvent.data.amount} viewers!
        </div>
      </EventItemContainer>
    );
  }

  const isSubscription = event.type === EventTypes.SUBSCRIPTION;
  const isGiftSubscription =
    isSubscription && (event as SubscribeSeEvent).data.gifted;

  if (isGiftSubscription) {
    const subscriptionEvent = event as SubscribeSeEvent;
    return (
      <EventItemContainer color={state}>
        <div>
          <strong>{subscriptionEvent.data.sender}</strong> gifted a subscription
          to <strong>{subscriptionEvent.data.displayName}</strong>!
        </div>
      </EventItemContainer>
    );
  }

  if (isSubscription) {
    const subscriptionEvent = event as SubscribeSeEvent;
    return (
      <EventItemContainer color={state}>
        <div>
          <strong>{subscriptionEvent.data.displayName}</strong> subscribed for{' '}
          {subscriptionEvent.data.amount}{' '}
          {subscriptionEvent.data.amount > 1 ? 'months' : 'month'}!
        </div>
      </EventItemContainer>
    );
  }

  console.warn('Unknown event type', { type: event.type });
};
