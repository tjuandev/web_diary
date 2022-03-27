import { SelectorProps } from "./types";

import uuid from "react-uuid";

type SharedProps = (width: number | string) => SelectorProps;

export const sharedProps: SharedProps = (width) => ({
  classNamePrefix: "neo-selector",
  width,
  isSearchable: false,
  menuPlacement: "top",
  closeMenuOnSelect: false,
  instanceId: uuid(),
});
