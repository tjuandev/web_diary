import { SelectorStyled } from "./Stylesheet";

import { SelectorProps } from "./types";

import { DropdownIndicator, MenuList, Menu, Option } from "./CustomComponents";

export const Selector = (props: SelectorProps) => {
  const { width = "10rem" } = props;

  return (
    <SelectorStyled
      classNamePrefix="neo-selector"
      width={width}
      isSearchable={false}
      components={{
        DropdownIndicator,
        MenuList,
        Menu,
        Option,
      }}
      {...props}
    />
  );
};
