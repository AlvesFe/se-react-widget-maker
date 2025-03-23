export enum EventTypes {
  CHAT = 'chat',
  FOLLOW = 'follow',
  SUBSCRIPTION = 'subscription',
  CHEER = 'cheer',
  RAID = 'raid',
} 

export interface ChatEvent {
  id: string;
  displayName: string;
  message: string;
  sentAt: string;
  type: EventTypes.CHAT;
}

export interface FollowEvent {
  id: string;
  displayName: string;
  followedAt: string;
  type: EventTypes.FOLLOW;
}

export interface SubscriptionEvent {
  id: string;
  displayName: string;
  isGift: boolean;
  subscriptionSentAt: string;
  amount: number;
  message?: string;
  tier: string;
  type: EventTypes.SUBSCRIPTION;
}

export interface CheerEvent {
  id: string;
  displayName: string;
  cheeredAt: string;
  message: string;
  bitsAmount: number;
  type: EventTypes.CHEER;
}

export interface RaidEvent {
  id: string;
  displayName: string;
  raidedAt: string;
  viewerCount: number;
  type: EventTypes.RAID;
}

export type Event = ChatEvent | FollowEvent | SubscriptionEvent | CheerEvent | RaidEvent;
