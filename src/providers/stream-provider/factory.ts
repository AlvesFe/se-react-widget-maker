import { v4 as uuidv4} from 'uuid';
import { ChatEvent, ChatInfo, EventTypes } from './types';

export const chatEventFactory = (event: ChatInfo): ChatEvent => {
  const id = event.tags.id ?? uuidv4();
  const displayName = event.tags['display-name'] ?? 'Unknown';
  const date = new Date(parseInt(event.tags['tmi-sent-ts'] ?? '0', 10));
  const sentAt = date.toISOString();
  return {
    activityId: id,
    _id: id,
    channel: event.channel,
    createdAt: sentAt,
    isMock: false,
    provider: 'tmi.js',
    sessionEventsCount: 1,
    type: EventTypes.CHAT,
    updatedAt: sentAt,
    data: {
      message: event.message,
      avatar: '',
      displayName,
      providerId: event.tags['user-id'] ?? '',
      username: event.tags.username ?? '',
    },
  };
}