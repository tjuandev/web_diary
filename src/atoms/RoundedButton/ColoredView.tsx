import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type ColoredProps = {
  color: string;
  className?: string;
  disable?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Wrapper = styled.div.attrs((props) => ({
  ...props,
}))<ColoredProps>`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.color};

  position: relative;

  ${(props) =>
    props.disable
      ? ""
      : css`
          :hover {
            filter: brightness(0.8);
          }
        `}

  .icon {
    display: none;
  }

  &.active {
    .icon {
      display: inline;
      position: absolute;
      z-index: 5;

      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      width: 50%;
      height: 50%;
    }
  }
`;

export const Colored = (props) => {
  return (
    <Wrapper {...props}>
      <FontAwesomeIcon icon={faCheck} className="icon" />
    </Wrapper>
  );
};
