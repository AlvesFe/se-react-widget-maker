import styled from 'styled-components';
import { EventTypeState } from './ecent-item.types';

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
`;