import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";

import Options from "./OptionsComponents";

export const Toolbar = () => {
  const editor = useSlate();

  return (
    <BarContainer>
      <Options editor={editor} />
    </BarContainer>
  );
};
