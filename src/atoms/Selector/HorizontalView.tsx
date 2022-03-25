import { SelectorStyled } from "./Stylesheet";

import {
  DropdownIndicator,
  Menu,
  ColorList,
  ColorOption,
  SingleValue,
} from "./CustomComponents";

import { SelectorProps, SingleCustomValueProps } from "./types";

export const HorizontalSelector = (props: SelectorProps) => {
  const {
    width = "10rem",
    isHorizontal = false,
    customSingleValue,
    isColorElement,
  } = props;

  return (
    <SelectorStyled
      classNamePrefix="neo-selector"
      width={width}
      isSearchable={false}
      components={{
        DropdownIndicator,
        MenuList: ColorList,
        Menu: (props) => <Menu isHorizontal={isHorizontal} {...props} />,
        Option: (props) => <ColorOption {...props} />,
        SingleValue: (props) => (
          <SingleValue
            customSingleValue={customSingleValue}
            isColorElement={isColorElement}
            {...(props as SingleCustomValueProps)}
          />
        ),
      }}
      {...props}
    />
  );
};
