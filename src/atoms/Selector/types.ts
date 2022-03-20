import { MenuProps, Props } from "react-select";

export type SelectorProps = Props & {
  width?: string | number;
  isHorizontal?: boolean;
};

export type MenuCustomProps = MenuProps & {
  isHorizontal?: boolean;
};
