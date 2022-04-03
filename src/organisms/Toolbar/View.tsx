import { BarContainer, OptionsContainer } from "./Stylesheet";

import { useSlate } from "slate-react";

import Options from "./OptionsComponents";

export const Toolbar = () => {
  const editor = useSlate();

  return (
    <BarContainer>
      <OptionsContainer>
        <Options editor={editor} />
      </OptionsContainer>
    </BarContainer>
  );
};
