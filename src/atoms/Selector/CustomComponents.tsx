import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { components } from "react-select";

import { MenuListWrapper, MenuWrapper, OptionItem } from "./Stylesheet";

import { MenuCustomProps } from "./types";

export const DropdownIndicator = () => <FontAwesomeIcon icon={faCaretDown} />;

export const Menu = (props: MenuCustomProps) => {
  const { isHorizontal = false } = props;

  return (
    <MenuWrapper isHorizontal={isHorizontal}>
      <components.Menu {...props}>{props.children}</components.Menu>
    </MenuWrapper>
  );
};

export const MenuList = (props) => {
  return (
    <MenuListWrapper>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </MenuListWrapper>
  );
};

export const Option = (props) => {
  return (
    <OptionItem>
      <components.Option {...props}>{props.children}</components.Option>
    </OptionItem>
  );
};
