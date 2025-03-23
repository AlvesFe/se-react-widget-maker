import { ChatUserstate } from 'tmi.js';

export interface StreamEventData {
  avatar: string;
  displayName: string;
  providerId: string;
  username: string;
}

export interface StreamEvent {
  type: string;
  activityId: string;
  channel: string;
  createdAt: string;
  isMock: boolean;
  provider: string;
  sessionEventsCount: number;
  updatedAt: string;
  _id: string;
  data: StreamEventData;
}

export interface StreamContextType {
  event: StreamEvent | null;
  chat: ChatInfo | null;
}

export interface ChatInfo {
  channel: string;
  tags: ChatUserstate;
  message: string;
  self: boolean;
}
