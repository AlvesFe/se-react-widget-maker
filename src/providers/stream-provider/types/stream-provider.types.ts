import { Badge, Emote } from './stream-elements.types';

export enum StreamEventType {
  FOLLOWER_LATEST = 'follower-latest',
  MESSAGE = 'message',
  SUBSCRIBER = 'subscriber',
  CHEER = 'cheer',
  RAID = 'raid',
  FOLLOW = 'follow',
}

/**
 * Base type for all StreamElements events data
 */
export interface BaseStreamEventData {
  displayName: string;
  username: string;
}


/**
 * Event data for StreamEventType.FOLLOWER_LATEST type
 */
export interface SubscriberEventData extends BaseStreamEventData {
  amount: number;
  avatar: string;
  message?: string;
}

/**
 * Event data for StreamEventType.CHEER type
 */
export interface CheerEventData extends BaseStreamEventData {
  amount: number;
  avatar: string;
  message: string;
}

/**
 * Event data for StreamEventType.RAID type
 */
export interface RaidEventData extends BaseStreamEventData {
  amount: number;
  avatar: string;
}

/**
 * Event data for StreamEventType.FOLLOW type
 */
export interface FollowEventData extends BaseStreamEventData {
  avatar: string;
}

/**
 * Event data for StreamEventType.MESSAGE type
 */
export interface MessageEventData extends BaseStreamEventData {
  message: string;
  emotes: Emote[];
  badges: Badge[];
  displayColor?: string;
}

export interface BaseStreamEvent {
  type: StreamEventType;
  id: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  isMock: boolean;
}

export interface SubscriberEvent extends BaseStreamEvent {
  type: StreamEventType.SUBSCRIBER;
  data: SubscriberEventData;
}

export interface CheerEvent extends BaseStreamEvent {
  type: StreamEventType.CHEER;
  data: CheerEventData;
}

export interface RaidEvent extends BaseStreamEvent {
  type: StreamEventType.RAID;
  data: RaidEventData;
}

export interface FollowEvent extends BaseStreamEvent {
  type: StreamEventType.FOLLOW;
  data: FollowEventData;
}

export interface FollowerLatestEvent extends Omit<BaseStreamEvent, 'channel'> {
  type: StreamEventType.FOLLOWER_LATEST;
  data: BaseStreamEventData;
}

export interface MessageEvent extends BaseStreamEvent {
  type: StreamEventType.MESSAGE;
  data: MessageEventData;
}

export type CommonStreamEvent = SubscriberEvent | CheerEvent | RaidEvent | FollowEvent;
export type StreamProviderEvent = CommonStreamEvent | MessageEvent | FollowerLatestEvent;

export interface StreamContextType {
  event: StreamProviderEvent | null;
}