import styled from "styled-components";

export const BarContainer = styled.nav`
  width: fit-content;
  height: fit-content;

  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 12px;

  position: fixed;

  top: 85%;
  left: 50%;

  transform: translateX(-50%);

  background: #f4f4f4;
  box-shadow: -4px -4px 4px #f8f8f8, 4px 4px 8px #e4e4e4;
  border-radius: 50px;
`;
