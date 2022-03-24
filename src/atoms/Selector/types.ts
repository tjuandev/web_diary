import { MenuProps, Props, SingleValueProps } from "react-select";

export type SelectorProps = Props & {
  width?: string | number;
  isHorizontal?: boolean;
};

export type MenuCustomProps = MenuProps & {
  isHorizontal?: boolean;
};

export type SingleCustomValueProps = SingleValueProps & {
  data: {
    value: string;
    label: string;
  };
  isHighlighter?: boolean;
};
