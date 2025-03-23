import { ChatUserstate } from 'tmi.js';

export interface BaseEventData {
  avatar: string;
  displayName: string;
  providerId: string;
  username: string;
}

export enum EventTypes {
  FOLLOW = 'follow',
  SUBSCRIPTION = 'subscriber',
  CHEER = 'cheer',
  RAID = 'raid',
  CHAT = 'chat',
} 

export interface BaseEvent<T> {
  activityId: string;
  channel: string;
  createdAt: string;
  data: T;
  isMock: boolean;
  provider: string;
  sessionEventsCount: number;
  type: EventTypes;
  updatedAt: string;
  _id: string;
}

export type FollowSeEvent = BaseEvent<BaseEventData>;

export interface SubscribeEventData extends BaseEventData {
  amount: number;
  gifted?: boolean;
  sender?: string;
}

export type SubscribeSeEvent = BaseEvent<SubscribeEventData>;

export interface CheerSeEventData extends BaseEventData {
  amount: number;
  message: string;
}

export type CheerSeEvent = BaseEvent<CheerSeEventData>;

export interface RaidSeEventData extends BaseEventData {
  amount: number;
}

export type RaidSeEvent = BaseEvent<RaidSeEventData>;

export type SeEvents = FollowSeEvent | SubscribeSeEvent | CheerSeEvent | RaidSeEvent;

export interface ChatInfo {
  channel: string;
  tags: ChatUserstate;
  message: string;
  self: boolean;
}

export interface ChatEventData extends BaseEventData {
  message: string;
}

export type ChatEvent = BaseEvent<ChatEventData>;

export type StreamEvent = SeEvents | ChatEvent;

export interface StreamContextType {
  event: StreamEvent | null;
}

