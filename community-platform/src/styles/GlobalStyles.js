import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ darkMode }) => (darkMode ? '#333' : '#f0f2f5')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
    font-family: 'Arial', sans-serif;
    font-size: ${({ fontSize }) => fontSize}px;
    margin: 0;
    padding: 0;
    transition: background 0.3s, color 0.3s, font-size 0.3s;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .App {
    flex: 1;
  }
`;