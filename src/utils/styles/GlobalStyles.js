import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f4f4f4;
    min-width: 100vw;
    min-height: 100vh;
  }
  
  button, input {
    border: none;
    background: none;
    outline: none;
  }
`;

export default GlobalStyles;