import { EventTypes } from '../../../providers/stream-provider/types';
import { EventTypeState } from './ecent-item.types';

export const EventTypeStateMap: ReadonlyMap<EventTypes, EventTypeState> = new Map([
  [EventTypes.CHAT, { bgColor: 'rgb(146, 246, 243)', textColor: 'rgb(0, 0, 0)' }],
  [EventTypes.FOLLOW, { bgColor: 'rgb(255, 39, 39)', textColor: 'rgb(255, 255, 255)' }],
  [EventTypes.SUBSCRIPTION, { bgColor: 'rgb(88, 252, 0)', textColor: 'rgb(0, 0, 0)' }],
  [EventTypes.CHEER, { bgColor: 'rgb(255, 255, 0)', textColor: 'rgb(0, 0, 0)' }],
  [EventTypes.RAID, { bgColor: 'rgb(0, 34, 255)', textColor: 'rgb(255, 255, 255)' }],
]);

export const DefaultState: EventTypeState = { bgColor: 'rgb(255, 255, 255)', textColor: 'rgb(0, 0, 0)' };