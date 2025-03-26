import { StreamEventType } from '../../../providers/stream-provider/types/stream-provider.types';
import { EventTypeState } from './event-item.types';

export const EventTypeStateMap: ReadonlyMap<StreamEventType, EventTypeState> = new Map([
  [StreamEventType.SUBSCRIBER, { bgColor: 'rgb(146, 246, 243)', textColor: 'rgb(0, 0, 0)' }],
  [StreamEventType.FOLLOWER_LATEST, { bgColor: 'rgb(255, 39, 39)', textColor: 'rgb(255, 255, 255)' }],
  [StreamEventType.FOLLOW, { bgColor: 'rgb(255, 39, 39)', textColor: 'rgb(255, 255, 255)' }],
  [StreamEventType.CHEER, { bgColor: 'rgb(88, 252, 0)', textColor: 'rgb(0, 0, 0)' }],
  [StreamEventType.RAID, { bgColor: 'rgb(255, 255, 0)', textColor: 'rgb(0, 0, 0)' }],
  [StreamEventType.MESSAGE, { bgColor: 'rgb(0, 34, 255)', textColor: 'rgb(255, 255, 255)' }],
]);

export const DefaultState: EventTypeState = { bgColor: 'rgb(255, 255, 255)', textColor: 'rgb(0, 0, 0)' };