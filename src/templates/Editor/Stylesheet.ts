import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  > div {
    background: #f4f4f4;
    height: 100%;
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

type ImageProps = {
  isFocused: boolean;
};

export const ImageContainer = styled.div<ImageProps>`
  position: relative;
  cursor: grab;
  width: fit-content;

  border: ${(props) => props.isFocused && "1px solid cyan"};
  margin: 0.5rem 0;

  .roundedButton {
    box-shadow: none;

    background: #f1f1f1;
    &,
    > svg {
      transition: all 0.25s ease;
    }

    :hover {
      background: crimson;
      > svg {
        color: #f4f4f4;
      }
    }
  }

  .image-content > img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    resize: both;
  }

  .image-content > button {
    display: ${(props) => (props.isFocused ? "block" : "none")};

    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
`;
