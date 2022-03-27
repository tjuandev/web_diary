import { SelectorProps } from "./types";

type SharedProps = (width: number | string) => SelectorProps;

export const sharedProps: SharedProps = (width) => ({
  classNamePrefix: "neo-selector",
  width,
  isSearchable: false,
  menuPlacement: "top",
  closeMenuOnSelect: false,
});
