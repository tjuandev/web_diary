import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background-color: #f4f4f4;
    min-width: 100vw;
    min-height: 100vh;

    font-family: Poppins, Verdana, Geneva, Tahoma, sans-serif;
  }

  button {
    cursor: pointer;
  }
  
  button, input {
    border: none;
    background: none;
    outline: none;
  }
`;

export default GlobalStyles;
