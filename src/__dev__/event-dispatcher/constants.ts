export const EVENT_TYPES = ['subscriber', 'cheer', 'raid', 'message', 'follower'] as const;

export const EVENT_TYPES_MAP: Record<typeof EVENT_TYPES[number], string> = {
  subscriber: 'Subscriber',
  cheer: 'Cheer',
  raid: 'Raid',
  message: 'Message',
  follower: 'Follower',
};