import { createContext } from 'react';
import { StreamContextType } from './types/stream-provider.types';

export const StreamContext = createContext<StreamContextType>({
  event: null,
});