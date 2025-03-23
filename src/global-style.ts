import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background:rgba(0, 0, 0, 0);
  }

  * {
    box-sizing: border-box;
  }

  body > #created-info {
    display: none;
  }
`;