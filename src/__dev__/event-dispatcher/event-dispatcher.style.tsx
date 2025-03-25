import styled from 'styled-components';

export const DispatchButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f00;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
  border: none;
  &:hover {
    background-color: #f55;
  }
`;

export const OptionsMenu = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  gap: 10px;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 150px;

  > button {
    padding: 10px;
    width: 100%;
    background-color: #f00;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f55;
    }

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;