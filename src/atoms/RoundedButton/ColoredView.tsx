import styled from "styled-components";

export const Colored = styled.div<{ color: string }>`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.color};
`;
