import { createContext } from 'react';
import { StreamContextType } from './types';

export const StreamContext = createContext<StreamContextType>({
  event: null,
});