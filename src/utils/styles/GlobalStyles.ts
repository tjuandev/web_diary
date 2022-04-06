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
    background-color: #F1F1F1;
    min-width: 100vw;
    min-height: 100vh;
    height: 1px;

    overflow: hidden;
  }

  button {
    cursor: pointer;
  }

  body,
  input,
  textarea,
  select,
  button {
    font-weight: 400;
    font-size: 1rem;
    font-family: Poppins, Verdana, Geneva, Tahoma, sans-serif;
  }

  input, 
  textarea, 
  select, 
  button {
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  
  button, input {
    border: none;
    background: none;
    outline: none;
  }

  .neo-selector__menu-portal {
    z-index: 3 !important;
  }
`;

export default GlobalStyles;
