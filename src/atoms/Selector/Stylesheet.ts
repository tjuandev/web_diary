import styled from "styled-components";
import Select from "react-select";

export const SelectorStyled = styled(Select)`
  width: fit-content;
  height: fit-content;

  .neo-selector__control,
  .neo-selector__control--menu-is-open {
    height: 3rem;
    padding: 0 1rem;

    border: 0;
    background: #f4f4f4;

    box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(0, 0, 0, 0.15);
    border-radius: 50px;

    option:checked {
      margin-right: 2rem;
    }

    :hover,
    &.neo-selector__control--menu-is-open {
      box-shadow: inset -2px -2px 5px #ffffff,
        inset 1px 1px 5px rgba(0, 0, 0, 0.2);
    }
  }

  .neo-selector__indicator-separator {
    display: none;
  }

  position: relative;
`;

export const Menu = styled.div`
  background: #f4f4f4;
  border-radius: 1rem;
  box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(0, 0, 0, 0.15);
`;
