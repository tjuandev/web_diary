import styled from "styled-components";

type RoundedButtonProps = {
  active: boolean;
  [x: string]: any;
};

const RoundedButton = styled.button.attrs((props: RoundedButtonProps) => ({
  ...props,
  className: `${props.active && "active"} roundedButton`,
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5rem;
  height: 2.5rem;

  background: #f4f4f4;
  box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 50%;

  font-size: larger;

  > svg {
    width: 35%;
  }

  &:hover,
  &.active {
    box-shadow: inset -2px -2px 5px #ffffff,
      inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

export default RoundedButton;
