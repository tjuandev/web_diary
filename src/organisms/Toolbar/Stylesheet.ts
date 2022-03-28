import styled from "styled-components";

export const BarContainer = styled.nav`
  display: flex;
  gap: 1rem;

  background: #f4f4f4;
  box-shadow: -4px -4px 4px #f8f8f8, 4px 4px 8px #e4e4e4;

  padding: 0.8rem 1.5rem;

  border-radius: 50px;

  position: fixed;
  top: calc(90% - 4rem);
  left: 50%;

  transform: translateX(-50%);
`;
