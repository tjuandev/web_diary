import { SelectorStyled } from "./Stylesheet";

import { SelectorProps } from "./types";

import { DropdownIndicator, MenuList, Menu, Option } from "./CustomComponents";

import { sharedProps } from "./sharedProps";

import { useDocumentReference } from "utils/hooks/useDocumentReference";

export const Selector = (props: SelectorProps) => {
  const { width = "10rem" } = props;

  const _document = useDocumentReference();

  return (
    <SelectorStyled
      menuPortalTarget={_document && _document.querySelector("body")}
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
