import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "utils/services/CustomToolbar";

const MarkButton = ({ format, value }) => {
  /* const editor = useSlate(); */
  const editor = {};

  return (
    <RoundedButton
      id={format}
      key={format}
      format={format}
      style={{ margin: "0.5rem" }}
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {value}
    </RoundedButton>
  );
};

const View = () => {
  return (
    <BarContainer>
      {Object.entries(editorToolbar.MarkButtons).map(([key, value]) => {
        return <MarkButton format={key} value={value} />;
      })}
    </BarContainer>
  );
};

export default View;
