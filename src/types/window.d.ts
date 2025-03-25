import { StreamElementsEvent } from '../providers/stream-provider/stream-provider.types';

export {};

declare global {
  interface Window {
    sendStreamEvent: (event: StreamElementsEvent) => void;
  }
}