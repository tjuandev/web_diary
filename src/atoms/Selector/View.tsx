import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SelectorStyled } from "./Stylesheet";

import { Props as SelectorProps } from "react-select";

const DropdownIndicator = () => <FontAwesomeIcon icon={faCaretDown} />;

export const Selector = (props: SelectorProps) => {
  return (
    <SelectorStyled
      classNamePrefix="neo-selector"
      isSearchable={false}
      components={{
        DropdownIndicator,
      }}
      {...props}
    />
  );
};
