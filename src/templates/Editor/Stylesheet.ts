import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;

  width: 100%;

  > div {
    background: #f4f4f4;
    height: 100vh;
    width: 46.5vw;
  }

  > div > div {
    padding: 0.25vw 0.75vw;

    height: 80vh;
    overflow-y: visible;
    overflow-x: hidden;
  }

  nav {
    width: 45vw;
  }

  @media (max-width: 1280px) {
    > div {
      width: 70vw;
    }

    nav {
      width: 68vw;
    }
  }

  @media (max-width: 1180px) {
    > div {
      width: 80vw;
    }

    nav {
      width: 75vw;
    }
  }

  @media (max-width: 980px) {
    > div,
    nav {
      width: 100%;
    }
  }
`;
