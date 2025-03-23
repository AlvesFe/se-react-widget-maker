import styled, { keyframes } from 'styled-components';
import { EventTypeState } from './event-item.types';

export const fadeInBottomAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const EventItemContainer = styled.div<{ color: EventTypeState }>`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  background: ${({ color }) => color.bgColor};
  color: ${({ color }) => color.textColor};
  border-radius: 10px;
  animation: ${fadeInBottomAnimation} 0.5s ease;
`;