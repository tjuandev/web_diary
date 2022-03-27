import { SelectorStyled } from "./Stylesheet";

import { SelectorProps } from "./types";

import { DropdownIndicator, MenuList, Menu, Option } from "./CustomComponents";
import { sharedProps } from "./sharedProps";

export const Selector = (props: SelectorProps) => {
  const { width = "10rem" } = props;

  return (
    <SelectorStyled
      components={{
        DropdownIndicator,
        MenuList,
        Menu,
        Option,
      }}
      {...sharedProps(width)}
      {...props}
    />
  );
};
