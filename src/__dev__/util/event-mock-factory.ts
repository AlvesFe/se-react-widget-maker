import { faker } from '@faker-js/faker';
import { StreamElementsEvent } from '../../providers/stream-provider/types/stream-elements.types';

export function generateMockEvent(type: string): StreamElementsEvent {
  const commonData = {
    avatar: faker.image.avatar(),
    displayName: faker.internet.username(),
    username: faker.internet.username(),
    providerId: faker.string.uuid(),
  };

  const baseEvent = {
    channel: faker.string.uuid(),
    provider: 'twitch',
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    isMock: true,
    _id: faker.string.uuid(),
    activityId: faker.string.uuid(),
    sessionEventsCount: 1,
  };

  switch (type) {
    case 'follower':
      return {
        listener: 'follower-latest',
        event: {
          ...commonData,
          name: faker.internet.username(),
          _id: faker.string.uuid(),
          sessionTop: false,
          type: 'follower',
          originalEventName: 'follower-latest',
        },
      };
    case 'subscriber':
      return {
        listener: 'event',
        event: {
          ...baseEvent,
          type: 'subscriber',
          data: { ...commonData, amount: 1 },
        },
      };
    case 'cheer':
      return {
        listener: 'event',
        event: {
          ...baseEvent,
          type: 'cheer',
          data: { ...commonData, amount: 1000, message: faker.lorem.sentence() },
        },
      };
    case 'raid':
      return {
        listener: 'event',
        event: {
          ...baseEvent,
          type: 'raid',
          data: { ...commonData, amount: faker.number.int({ min: 1, max: 50 }) },
        },
      };
    case 'message':
      return {
        listener: 'message',
        event: {
          service: 'twitch',
          data: {
            time: Date.now(),
            tags: {
              'display-name': faker.internet.username(),
              color: faker.color.rgb(),
              id: faker.string.uuid(),
              'room-id': faker.string.uuid(),
              'user-id': faker.string.uuid(),
            },
            nick: faker.internet.username(),
            userId: faker.string.uuid(),
            displayName: faker.internet.username(),
            displayColor: faker.color.rgb(),
            badges: [
              {
                type: 'broadcaster',
                version: '1',
                url: faker.image.url(),
                description: 'Broadcaster',
              },
            ],
            channel: faker.internet.username(),
            text: faker.lorem.sentence(),
            isAction: false,
            emotes: [],
            msgId: faker.string.uuid(),
          },
          renderedText: faker.lorem.sentence(),
        },
      };
    default:
      throw new Error(`Tipo de evento desconhecido: ${type}`);
  }
}
