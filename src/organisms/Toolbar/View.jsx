import { RoundedButton } from "atoms";
import { editorToolbar } from "utils/constants";
import { BarContainer } from "./Stylesheet";

import { useSlate } from "slate-react";
import {
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "utils/services/CustomEditor";

const BaseButton = ({ format, value, isActive, toggleNode, editor }) => {
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
  const editor = useSlate();

  return (
    <BarContainer>
      <select
        onChange={(e) => {
          return toggleBlock(editor, e.target.value);
        }}
        value={editor.getFragment()[0]?.type}
      >
        {Object.entries(editorToolbar.TypographyOptions).map(
          ([value, name]) => {
            return (
              <option value={value} key={value}>
                {name}
              </option>
            );
          }
        )}
      </select>
      {Object.entries(editorToolbar.MarkButtons).map(([key, value]) => {
        return (
          <BaseButton
            key={key}
            format={key}
            value={value}
            editor={editor}
            isActive={isMarkActive}
            toggleNode={toggleMark}
          />
        );
      })}
      <select
        onChange={(e) => {
          return toggleMark(editor, "color", e.target.value);
        }}
      >
        {Object.entries(editorToolbar.ColorsOptions).map(([key, color]) => {
          return (
            <option value={color} key={key}>
              {color}
            </option>
          );
        })}
      </select>
    </BarContainer>
  );
};

export default View;
