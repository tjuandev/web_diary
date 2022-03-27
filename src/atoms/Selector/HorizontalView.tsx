import { SelectorStyled } from "./Stylesheet";

import {
  DropdownIndicator,
  Menu,
  ButtonList,
  ButtonOption,
  SingleValue,
} from "./CustomComponents";

import { SelectorProps, SingleCustomValueProps } from "./types";
import { sharedProps } from "./sharedProps";

export const HorizontalSelector = (props: SelectorProps) => {
  const {
    width = "10rem",
    isHorizontal = false,
    customSingleValue,
    isColorElement,
  } = props;

  return (
    <SelectorStyled
      components={{
        DropdownIndicator,
        MenuList: ButtonList,
        Menu: (props) => <Menu isHorizontal={isHorizontal} {...props} />,
        Option: (props) => <ButtonOption {...props} />,
        SingleValue: (props) => (
          <SingleValue
            customSingleValue={customSingleValue}
            isColorElement={isColorElement}
            {...(props as SingleCustomValueProps)}
          />
        ),
      }}
      {...sharedProps(width)}
      {...props}
    />
  );
};
