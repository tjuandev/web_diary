import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";

import { components, MenuListProps, OptionProps } from "react-select";

import {
  MenuListWrapper,
  MenuWrapper,
  OptionItem,
  ButtonListWrapper,
  ButtonOptionWrapper,
  MenuHorizontalWrapper,
} from "./Stylesheet";

import { MenuCustomProps, SingleCustomValueProps } from "./types";

export const DropdownIndicator = () => <FontAwesomeIcon icon={faCaretUp} />;

export const Menu = (props: MenuCustomProps) => {
  return (
    <MenuWrapper>
      <components.Menu {...props}>{props.children}</components.Menu>
    </MenuWrapper>
  );
};

export const MenuHorizontal = (props: MenuCustomProps) => {
  return (
    <MenuHorizontalWrapper>
      <components.Menu {...props}>{props.children}</components.Menu>
    </MenuHorizontalWrapper>
  );
};

export const MenuList = (props: MenuListProps) => {
  return (
    <MenuListWrapper>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </MenuListWrapper>
  );
};

export const Option = (props: OptionProps) => {
  return (
    <OptionItem>
      <components.Option {...props}>{props.children}</components.Option>
    </OptionItem>
  );
};

export const SingleValue = (props: SingleCustomValueProps) => {
  const { data, children, isColorElement, customSingleValue } = props;

  const childrenType = customSingleValue ? customSingleValue : children;
  const transparentColor =
    data.value === "transparent" ? "#c0c0c0" : data.value;

  const Children = () => {
    if (customSingleValue && !isColorElement) return customSingleValue;
    else if (isColorElement) {
      return React.cloneElement(childrenType, {
        color: transparentColor,
        disable: "true",
      });
    } else return children;
  };

  return (
    <>
      <components.SingleValue {...props}>
        <Children />
      </components.SingleValue>
    </>
  );
};

export const ButtonList = (props: MenuListProps) => {
  return (
    <ButtonListWrapper>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </ButtonListWrapper>
  );
};

export const ButtonOption = (props: OptionProps) => {
  const { isSelected } = props;

  return (
    <ButtonOptionWrapper>
      <components.Option {...props}>
        {React.cloneElement(props.children as ReactElement, {
          className: isSelected ? "active" : "",
        })}
      </components.Option>
    </ButtonOptionWrapper>
  );
};
