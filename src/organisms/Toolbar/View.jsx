import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "utils/services/CustomEditor";

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
            format={key}
            value={value}
            isActive={isMarkActive}
            toggleNode={toggleMark}
          />
        );
      })}
      })}
    </BarContainer>
  );
};

export default View;
