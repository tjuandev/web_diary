import styled from "styled-components";

export const BarContainer = styled.nav`
  background: #f4f4f4;
  box-shadow: -4px -4px 4px #f8f8f8, 4px 4px 8px #e4e4e4;

  border-radius: 50px;

  position: fixed;
  top: calc(90% - 4rem);
  left: 50%;

  z-index: 2;

  transform: translateX(-50%);
  max-width: 100%;
  @media (max-width: 980px) {
    top: 100vh;
    left: 0;
    transform: translate(0, -100%);
    border-radius: 0;
    overflow-x: scroll;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 1rem;

  padding: 1rem;

  @media (max-width: 980px) {
    width: fit-content;
  }
`;
