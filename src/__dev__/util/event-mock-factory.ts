import { faker } from '@faker-js/faker';
import { StreamElementsEvent } from '../../providers/stream-provider/types/stream-elements.types';

const twitchChatMessages = [
  "boa jogada",
  "esse cara joga muito",
  "alguém clipe isso",
  "que azar kkk",
  "vai dar bom",
  "tá lagando ou é só pra mim?",
  "foco agora",
  "essa música é boa",
  "muito close call",
  "caramba, quase!",
  "jogaço hoje",
  "belo trabalho",
  "tá indo bem demais",
  "chat calmo hoje",
  "alguém sabe o setup que ele usa?",
  "foi por pouco",
  "risos kkk",
  "não esperava essa",
  "confia",
  "isso foi absurdo"
];

const twitchBadges = [
  {
    "type": "broadcaster",
    "version": "1",
    "url": "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3",
    "description": "Broadcaster"
  },
  {
    "type": "minecraft-15th-anniversary-celebration",
    "version": "1",
    "url": "https://static-cdn.jtvnw.net/badges/v1/178077b2-8b86-4f8d-927c-66ed6c1b025f/3",
    "description": "Minecraft 15th Anniversary Celebration"
  }
]


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
            badges: faker.helpers.arrayElements(twitchBadges, faker.number.int({ min: 0, max: 2 })),
            channel: faker.internet.username(),
            text: faker.helpers.arrayElement(twitchChatMessages),
            isAction: false,
            emotes: [],
            msgId: faker.string.uuid(),
          },
          renderedText: faker.helpers.arrayElement(twitchChatMessages),
        },
      };
    default:
      throw new Error(`Tipo de evento desconhecido: ${type}`);
  }
}
