import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";

import Options from "./OptionsComponents";

const View = () => {
  const editor = useSlate();

  return (
    <BarContainer>
      <Options editor={editor} />
    </BarContainer>
  );
};

export default View;
