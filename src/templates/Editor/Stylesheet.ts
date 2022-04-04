import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;

  width: 100%;

  > div {
    background: #f4f4f4;
    height: 100ex;
    width: 46.5vw;
  }

  > div > div {
    padding: 0.25vw 0.75vw;

    height: 72.5vh;
    overflow-y: visible;
    overflow-x: hidden;
  }

  nav {
    width: 45vw;
  }

  @media (max-width: 980px) {
    > div {
      height: 80vh;
    }

    > div,
    nav {
      width: 100%;
    }
  }
`;
