import styled from "styled-components";

const RoundedButton = styled.button.attrs((props) => ({
  ...props,
  className: props.active && "active",
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 45px;
  height: 45px;

  background: #f4f4f4;
  box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 50%;

  font-size: large;

  &:hover,
  &.active {
    box-shadow: inset -2px -2px 5px #ffffff,
      inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

export default RoundedButton;
