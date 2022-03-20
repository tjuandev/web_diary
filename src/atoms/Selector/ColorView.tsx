import { SelectorStyled } from "./Stylesheet";

import { DropdownIndicator, Menu, MenuList, Option } from "./CustomComponents";

import { SelectorProps } from "./types";

export const ColorSelector = (props: SelectorProps) => {
  const { width = "10rem", isHorizontal = false } = props;

  return (
    <SelectorStyled
      classNamePrefix="neo-selector"
      width={width}
      isSearchable={false}
      components={{
        DropdownIndicator,
        MenuList,
        Menu: (props) => <Menu isHorizontal={isHorizontal} {...props} />,
        Option,
      }}
      {...props}
    />
  );
};
