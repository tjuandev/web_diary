import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";

import {
  SelectTypography,
  MarkButtons,
  ColorSelector,
  BgSelector,
  TextAlignmentSelector,
  BlockButtons,
  InsertImageButton
} from "./OptionsComponents";
const View = () => {
  const editor = useSlate();

  return (
    <BarContainer>
      <SelectTypography editor={editor} />
      <MarkButtons editor={editor} />
      <BlockButtons editor={editor} />
      <InsertImageButton />
      <ColorSelector editor={editor} />
      <BgSelector editor={editor} />
      <TextAlignmentSelector editor={editor} />
    </BarContainer>
  );
};


export default View;
