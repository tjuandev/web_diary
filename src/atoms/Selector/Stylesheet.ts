import dynamic from "next/dynamic";
import styled from "styled-components";

import { SelectorProps } from "./types";

const Select = dynamic(() => import("react-select"), { ssr: false });

export const SelectorStyled = styled(Select)<SelectorProps>`
  width: ${(props) => props.width};

  .neo-selector__control,
  .neo-selector__control--menu-is-open {
    cursor: pointer;

    flex-wrap: unset;

    height: 2.5rem;
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

  .neo-selector__value-container {
    padding: 0 1rem 0 0;
  }

  .neo-selector__indicator-separator {
    display: none;
  }

  .neo-selector__single-value {
    overflow: initial;

    > svg {
      font-size: 1.5rem;
    }
  }

  .roundedButton {
    box-shadow: none;
    background: transparent;
  }

  .roundedButton:hover {
    box-shadow: none;
  }

  position: relative;
`;

export const MenuWrapper = styled.menu`
  .neo-selector__menu {
    border: 0;
    box-shadow: none;
    background: transparent;
    padding: 0;
  }
`;

export const MenuHorizontalWrapper = styled(MenuWrapper)`
  .neo-selector__menu,
  .neo-selector__menu-list {
    display: flex;
    gap: 0.5rem;
  }
`;

export const MenuListWrapper = styled.div`
  background: #f4f4f4;
  border-radius: 1rem;
  box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px rgba(0, 0, 0, 0.15);

  .neo-selector__menu-list {
    padding: 0;
  }

  > div > div:first-child .neo-selector__option {
    border-radius: 1rem 1rem 0 0;
  }

  > div > div:last-child .neo-selector__option {
    border-radius: 0 0 1rem 1rem;
  }
`;

export const OptionItem = styled.div`
  .neo-selector__option--is-focused {
    color: #000;
    background: #e1e1e1;
    cursor: pointer;
  }

  .neo-selector__option--is-selected {
    color: #000;
    background: #d1d0d0;
  }
  :hover {
    background: transparent;
  }
`;

export const ButtonListWrapper = styled(MenuListWrapper)`
  border-radius: 5rem;
  padding: 0.5rem;
`;

export const ButtonOptionWrapper = styled.div`
  .roundedButton {
    box-shadow: none;
  }

  .neo-selector__option {
    padding: 0;
  }
  .neo-selector__option--is-focused {
    background: transparent;
    cursor: pointer;

    .roundedButton {
      background: #e1e1e1;
    }
  }

  .neo-selector__option--is-selected {
    background: transparent;

    .roundedButton {
      background: #d1d0d0;
    }
  }
`;
