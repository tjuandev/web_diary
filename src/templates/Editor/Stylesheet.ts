import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    height: 70vh;
    overflow: auto;
    margin-top: 1.5rem;
  }

  > div,
  nav {
    width: 45vw;
  }

  @media (max-width: 980px) {
    > div {
      height: 80vh;
      margin-top: 1rem;
    }

    > div,
    nav {
      width: 100%;
    }
  }
`;
