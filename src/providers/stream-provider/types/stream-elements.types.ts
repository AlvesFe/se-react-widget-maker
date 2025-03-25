export interface BaseEvent {
  _id: string;
  activityId: string;
  channel: string;
  createdAt: string;
  isMock: boolean;
  provider: string;
  sessionEventsCount: number;
  type: string;
  updatedAt: string;
}

export interface BaseEventData {
  amount: number;
  avatar: string;
  displayName: string;
  username: string;
  providerId: string;
}

export interface SubscriberEvent extends BaseEvent {
  type: 'subscriber';
  data: BaseEventData & { message?: string };
}

export interface CheerEvent extends BaseEvent {
  type: 'cheer';
  data: BaseEventData & { message: string };
}

export interface RaidEvent extends BaseEvent {
  type: 'raid';
  data: BaseEventData;
}

export interface FollowerEvent extends BaseEvent {
  type: 'follow';
  data: Omit<BaseEventData, 'amount'>;
}

export interface Badge {
  type: string;
  version: string;
  url: string;
  description: string;
}

export interface EmoteUrlSet {
  [size: string]: string;
}

export interface Emote {
  type: string;
  name: string;
  id: string;
  gif: boolean;
  urls: EmoteUrlSet;
  start: number;
  end: number;
}

export interface MessageTags {
  [key: string]: string;
}

export interface MessageData {
  time: number;
  tags: MessageTags;
  nick: string;
  userId: string;
  displayName: string;
  displayColor: string;
  badges: Badge[];
  channel: string;
  text: string;
  isAction: boolean;
  emotes: Emote[];
  msgId: string;
}

export interface MessageEvent {
  service: string;
  data: MessageData;
  renderedText: string;
}

export interface FollowerLatestEvent {
  avatar: string;
  displayName: string;
  providerId: string;
  name: string;
  _id: string;
  sessionTop: boolean;
  type: 'follower';
  originalEventName: string;
}

// message event listeners
export interface MessageListener {
  listener: 'message';
  event: MessageEvent;
}

//follower-latest event listeners
export interface FollowerLatestListener {
  listener: 'follower-latest';
  event: FollowerLatestEvent;
}

// event listeners
export interface SubscriberListener {
  listener: 'event';
  event: SubscriberEvent;
}

export interface CheerListener {
  listener: 'event';
  event: CheerEvent;
}

export interface RaidListener {
  listener: 'event';
  event: RaidEvent;
}

export interface FollowerListener {
  listener: 'event';
  event: FollowerEvent;
}

export type EventListener = SubscriberListener | CheerListener | RaidListener | FollowerListener;

/**
 * StreamElements event
 */
export type StreamElementsEvent = MessageListener | FollowerLatestListener | EventListener;