import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";

import {
  SelectTypography,
  MarkButtons,
  ColorSelector,
  BgSelector,
} from "./OptionsComponents";
import { TextAlignmentSelector } from "./OptionsComponents";
import { BlockButtons } from "./OptionsComponents";

const View = () => {
  const editor = useSlate();

  return (
    <BarContainer>
      <SelectTypography editor={editor} />
      <MarkButtons editor={editor} />
      <BlockButtons editor={editor} />
      <ColorSelector editor={editor} />
      <BgSelector editor={editor} />
      <TextAlignmentSelector editor={editor} />
    </BarContainer>
  );
};

export default View;
