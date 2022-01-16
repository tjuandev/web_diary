import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "utils/services/CustomEditor";

const BaseButton = ({ format, value, isActive, toggleNode }) => {
  const editor = useSlate();

  return (
    <RoundedButton
      id={format}
      key={format}
      style={{ margin: "0.5rem" }}
      active={isActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleNode(editor, format);
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
        return (
          <BaseButton
            key={key}
            format={key}
            value={value}
            isActive={isMarkActive}
            toggleNode={toggleMark}
          />
        );
      })}
      {Object.entries(editorToolbar.BlockButtons).map(([key, value]) => {
        return (
          <BaseButton
            key={key}
            format={key}
            value={value}
            isActive={isBlockActive}
            toggleNode={toggleBlock}
          />
        );
      })}
    </BarContainer>
  );
};

export default View;
