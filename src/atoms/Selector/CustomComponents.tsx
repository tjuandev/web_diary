import { faCaretDown, faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";

import { components, MenuListProps, OptionProps } from "react-select";

import {
  MenuListWrapper,
  MenuWrapper,
  OptionItem,
  ColorListWrapper,
  ColorOptionWrapper,
} from "./Stylesheet";

import { MenuCustomProps, SingleCustomValueProps } from "./types";

export const DropdownIndicator = () => <FontAwesomeIcon icon={faCaretDown} />;

export const Menu = (props: MenuCustomProps) => {
  const { isHorizontal = false } = props;

  return (
    <MenuWrapper isHorizontal={isHorizontal}>
      <components.Menu {...props}>{props.children}</components.Menu>
    </MenuWrapper>
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
  const { data, children, isHighlighter } = props;

  return (
    <>
      <components.SingleValue {...props}>
        {isHighlighter ? (
          <FontAwesomeIcon
            icon={faHighlighter}
            size="2x"
            color={data.value === "transparent" ? "#c0c0c0" : data.value}
          />
        ) : (
          children
        )}
      </components.SingleValue>
    </>
  );
};

export const ColorList = (props: MenuListProps) => {
  return (
    <ColorListWrapper>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </ColorListWrapper>
  );
};

export const ColorOption = (props: OptionProps) => {
  const { isSelected } = props;

  return (
    <ColorOptionWrapper>
      <components.Option {...props}>
        {React.cloneElement(props.children as ReactElement, {
          className: isSelected && "active",
        })}
      </components.Option>
    </ColorOptionWrapper>
  );
};
