import { io, Socket } from 'socket.io-client';
import { ChatInfo, StreamEvent } from './types';
import { Client as tmiClient } from 'tmi.js';

const SE_API_URL = 'https://realtime.streamelements.com';

const onConnect = async (socket: Socket) => {
  socket.emit('authenticate', {
    method: 'jwt',
    token: import.meta.env.VITE_SE_TOKEN,
  });
};

export const seApi = async (onEventUpdate: (data: StreamEvent) => void): Promise<void> => {
  const socket = io(SE_API_URL, {
    transports: ['websocket'],
  });

  socket.on('connect', () => onConnect(socket));
  socket.on('disconnect', () => console.info('Disconnected from SE API'));
  socket.on('authenticated', () => console.info('Authenticated with SE API'));
  socket.on('event', onEventUpdate);
}


export const chatApi = async (onMessage: (info: ChatInfo) => void): Promise<void> => {
  const client = new tmiClient({
    connection: { reconnect: true },
    channels: [import.meta.env.VITE_TWITCH_CHANNEL],
  });

  client.connect();
  client.on("connected", () => console.info("Connected to Twitch chat"));
  client.on("message", (channel, tags, message, self) => {
    onMessage({ channel, tags, message, self });
  });
}