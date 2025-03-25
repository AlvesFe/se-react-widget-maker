import { Badge, Emote } from './stream-elements.types';

export type StreamEventType = 'follower' | 'subscriber' | 'cheer' | 'raid' | 'message' | 'follower-latest';

export interface StreamEventData {
  avatar?: string;
  displayName: string;
  username: string;
  amount?: number;
  message?: string;
  emotes?: Emote[];
  badges?: Badge[];
  displayColor?: string;
}

/**
 * Normalized StreamElements event, used for the context, simplier to use
 */
export interface StreamProviderEvent {
  type: StreamEventType;
  id: string;
  channel?: string;
  createdAt: string;
  updatedAt: string;
  isMock: boolean;
  data: StreamEventData;
}

export interface StreamContextType {
  event: StreamProviderEvent | null;
}